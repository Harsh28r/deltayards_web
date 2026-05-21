import os
import shutil
from datetime import datetime

from django.conf import settings
from django.core.management.base import BaseCommand

from admin_panel.models import Property, Property_Images

IMAGE_EXTS = ('.jpg', '.jpeg', '.png', '.webp', '.gif')
SKIP_DIRS = {'videos', 'doc'}


class Command(BaseCommand):
    help = 'Fill missing/placeholder property images from available media'

    def _placeholder_size(self):
        path = os.path.join(settings.MEDIA_ROOT, 'no_image-1.png')
        return os.path.getsize(path) if os.path.isfile(path) else None

    def _is_placeholder_file(self, path, ph_size):
        if not os.path.isfile(path):
            return True
        if ph_size is None:
            return False
        return os.path.getsize(path) == ph_size

    def _collect_real_images(self, ph_size):
        pool = []
        base = os.path.join(settings.MEDIA_ROOT, 'property-images')
        if not os.path.isdir(base):
            return pool
        for prop_dir in sorted(os.listdir(base), key=lambda x: int(x) if x.isdigit() else 999):
            prop_path = os.path.join(base, prop_dir)
            if not os.path.isdir(prop_path):
                continue
            for root, dirs, files in os.walk(prop_path):
                dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
                for name in sorted(files):
                    if not name.lower().endswith(IMAGE_EXTS):
                        continue
                    full = os.path.join(root, name)
                    if ph_size and os.path.getsize(full) == ph_size:
                        continue
                    rel = os.path.relpath(full, settings.MEDIA_ROOT).replace('\\', '/')
                    pool.append(rel)
        static_pool = []
        for name in ('1.png', '2.png'):
            rel = f'frontend/images/slider/{name}'
            full = os.path.join(settings.STATICFILES_DIRS[0], 'frontend', 'images', 'slider', name)
            if os.path.isfile(full):
                static_pool.append(full)
        return pool, static_pool

    def _copy_to(self, source_full, dest_rel):
        dest = os.path.join(settings.MEDIA_ROOT, dest_rel)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(source_full, 'rb') as src:
            data = src.read()
        with open(dest, 'wb') as out:
            out.write(data)
        return dest_rel

    def handle(self, *args, **options):
        ph_size = self._placeholder_size()
        pool, static_pool = self._collect_real_images(ph_size)
        if not pool and not static_pool:
            self.stderr.write('No source images found.')
            return

        pool_idx = 0
        filled = 0
        now = datetime.now()
        added_by = 'system'

        def next_source():
            nonlocal pool_idx
            if pool:
                rel = pool[pool_idx % len(pool)]
                pool_idx += 1
                return os.path.join(settings.MEDIA_ROOT, rel), rel
            s = static_pool[pool_idx % len(static_pool)]
            pool_idx += 1
            return s, None

        for prop in Property.objects.filter(property_status='Active').order_by('id'):
            prop_pool = [
                os.path.join(settings.MEDIA_ROOT, rel)
                for rel in pool
                if f'property-images/{prop.id}/' in rel
            ]
            source_idx = 0

            def prop_source():
                nonlocal source_idx
                if prop_pool:
                    full = prop_pool[source_idx % len(prop_pool)]
                    source_idx += 1
                    rel = os.path.relpath(full, settings.MEDIA_ROOT).replace('\\', '/')
                    return full, rel
                return next_source()

            images = list(Property_Images.objects.filter(prop_id=prop.id))
            has_real_thumb = False
            for img in images:
                if img.image_type == 'Thumbnail':
                    dest = os.path.join(settings.MEDIA_ROOT, img.image_url)
                    if not self._is_placeholder_file(dest, ph_size):
                        has_real_thumb = True

            for img in images:
                dest = os.path.join(settings.MEDIA_ROOT, img.image_url)
                if not self._is_placeholder_file(dest, ph_size):
                    continue
                src_full, src_rel = prop_source()
                if src_rel:
                    self._copy_to(src_full, img.image_url)
                else:
                    static_dest = os.path.join(
                        settings.MEDIA_ROOT,
                        'property-images',
                        str(prop.id),
                        os.path.basename(img.image_url) or 'listing.jpg',
                    )
                    os.makedirs(os.path.dirname(static_dest), exist_ok=True)
                    shutil.copy2(src_full, static_dest)
                    img.image_url = os.path.relpath(static_dest, settings.MEDIA_ROOT).replace('\\', '/')
                    img.save(update_fields=['image_url'])
                filled += 1
                self.stdout.write(f'Fixed [{prop.id}] {img.image_url}')

            if not has_real_thumb:
                src_full, src_rel = prop_source()
                if src_rel:
                    thumb_rel = src_rel
                    self._copy_to(src_full, thumb_rel)
                else:
                    thumb_rel = f'property-images/{prop.id}/thumbnail.jpg'
                    self._copy_to(src_full, thumb_rel)
                Property_Images.objects.create(
                    date=now,
                    image_url=thumb_rel,
                    image_type='Thumbnail',
                    prop_id=prop.id,
                    added_by=added_by,
                )
                filled += 1
                self.stdout.write(f'Added thumbnail [{prop.id}] {thumb_rel}')

            gallery_count = Property_Images.objects.filter(prop_id=prop.id).exclude(
                image_type='Thumbnail'
            ).count()
            while gallery_count < 3:
                src_full, src_rel = prop_source()
                if src_rel:
                    gallery_rel = src_rel
                    if Property_Images.objects.filter(prop_id=prop.id, image_url=gallery_rel).exists():
                        gallery_rel = f'property-images/{prop.id}/gallery_{gallery_count + 1}.jpg'
                        self._copy_to(src_full, gallery_rel)
                else:
                    gallery_rel = f'property-images/{prop.id}/gallery_{gallery_count + 1}.jpg'
                    self._copy_to(src_full, gallery_rel)
                if not Property_Images.objects.filter(prop_id=prop.id, image_url=gallery_rel).exists():
                    Property_Images.objects.create(
                        date=now,
                        image_url=gallery_rel,
                        image_type='',
                        prop_id=prop.id,
                        added_by=added_by,
                    )
                    gallery_count += 1
                    filled += 1
                    self.stdout.write(f'Added gallery [{prop.id}] {gallery_rel}')

        self.stdout.write(self.style.SUCCESS(f'Done. Updated/added {filled} images.'))
