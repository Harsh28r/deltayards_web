import os
import shutil

from django.conf import settings
from django.core.management.base import BaseCommand

from admin_panel.models import Property_Images
from website.views import UtilityCls

IMAGE_EXTS = ('.jpg', '.jpeg', '.png', '.webp', '.gif')


class Command(BaseCommand):
    help = 'Copy available property images to missing DB paths'

    def handle(self, *args, **options):
        repaired = 0
        skipped = 0

        for img in Property_Images.objects.all():
            if not img.image_url or img.image_url == 'no_image-1.png':
                continue

            dest = os.path.join(settings.MEDIA_ROOT, img.image_url)
            if os.path.isfile(dest):
                continue

            source_rel = UtilityCls._find_property_folder_image(img.image_url)
            if not source_rel:
                skipped += 1
                self.stdout.write(self.style.WARNING(f'No source: {img.image_url}'))
                continue

            source = os.path.join(settings.MEDIA_ROOT, source_rel)
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            shutil.copy2(source, dest)
            repaired += 1
            self.stdout.write(f'OK {img.image_url} <- {source_rel}')

        placeholder = os.path.join(settings.MEDIA_ROOT, 'no_image-1.png')
        for img in Property_Images.objects.all():
            if not img.image_url or img.image_url == 'no_image-1.png':
                continue
            dest = os.path.join(settings.MEDIA_ROOT, img.image_url)
            if os.path.isfile(dest):
                continue
            if not os.path.isfile(placeholder):
                skipped += 1
                continue
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            shutil.copy2(placeholder, dest)
            repaired += 1
            self.stdout.write(f'PLACEHOLDER {img.image_url}')

        self.stdout.write(self.style.SUCCESS(
            f'Done. Repaired {repaired}, still missing {skipped}.'
        ))
