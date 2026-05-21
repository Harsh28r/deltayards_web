from datetime import datetime
import uuid

from django.core.management.base import BaseCommand

from admin_panel.models import (
    Property,
    Property_Amenities,
    Property_Features,
    Property_Images,
    Property_Rooms,
    job_description,
)


class Command(BaseCommand):
    help = 'Seed sample properties and jobs for local development'

    def handle(self, *args, **options):
        if Property.objects.exists():
            self.stdout.write(self.style.WARNING('Properties already exist — skipping seed.'))
            return

        now = datetime.now()
        added_by = 'system'

        samples = [
            {
                'project_name': 'Skyline Residency',
                'code_name': 'SKY-001',
                'prop_type': 'Residential',
                'prop_about': 'Premium 2 & 3 BHK apartments in Mira Road with modern amenities and excellent connectivity.',
                'prop_city': 'Mira Road',
                'prop_price': '8500000',
                'prop_rooms': '2 BHK',
                'featured': 'Yes',
            },
            {
                'project_name': 'Green Valley Heights',
                'code_name': 'GVH-002',
                'prop_type': 'Residential',
                'prop_about': 'Spacious homes near schools and metro with landscaped gardens and clubhouse.',
                'prop_city': 'Thane',
                'prop_price': '12500000',
                'prop_rooms': '3 BHK',
                'featured': 'Yes',
            },
            {
                'project_name': 'Delta Business Park',
                'code_name': 'DBP-003',
                'prop_type': 'Commercial',
                'prop_about': 'Grade-A office spaces ideal for startups and established businesses.',
                'prop_city': 'Mumbai',
                'prop_price': '22000000',
                'prop_rooms': 'Office',
                'featured': 'No',
            },
        ]

        for i, s in enumerate(samples, start=1):
            prop = Property.objects.create(
                unique_id=str(uuid.uuid4())[:12],
                project_name=s['project_name'],
                code_name=s['code_name'],
                prop_about=s['prop_about'],
                prop_type=s['prop_type'],
                prop_address=f'Plot {i}, Main Road',
                prop_pincode=401107,
                prop_city=s['prop_city'],
                prop_state='Maharashtra',
                prop_country='India',
                build_status_ready='Yes',
                build_status_under='No',
                build_floors=20,
                build_wings=2,
                builder_name='Delta Yards Partners',
                possesssion_date='Dec 2026',
                maharera_number=f'P{i:06d}000000',
                project_land_parcel='2.5 Acres',
                date=now,
                added_by=added_by,
                property_status='Active',
                featured_property=s['featured'],
                popular_property='Yes' if i == 1 else 'No',
                property_page='Yes',
                brochure='',
            )
            Property_Rooms.objects.create(
                date=now,
                prop_rooms=s['prop_rooms'],
                prop_carpet_area='950 sq.ft',
                prop_price=s['prop_price'],
                blue_print='',
                threed_print='',
                prop=prop,
                added_by=added_by,
            )
            Property_Images.objects.create(
                date=now,
                image_url='no_image-1.png',
                image_type='Thumbnail',
                prop=prop,
                added_by=added_by,
            )
            Property_Images.objects.create(
                date=now,
                image_url=f'frontend/images/slider/{i}.png',
                image_type='Gallery',
                prop=prop,
                added_by=added_by,
            )
            Property_Amenities.objects.create(
                date=now,
                amenity='Swimming Pool',
                amenity_desc='Olympic size pool',
                prop=prop,
                added_by=added_by,
            )
            Property_Features.objects.create(
                date=now,
                feature='RERA Registered',
                feature_desc='Maharashtra RERA compliant project',
                prop=prop,
                added_by=added_by,
            )

        if not job_description.objects.exists():
            job_description.objects.create(
                date=now,
                title='Sales Executive',
                description='Drive property sales and client relationships across Mumbai MMR.',
                job_status='Active',
                unique_id=str(uuid.uuid4())[:12],
            )

        self.stdout.write(self.style.SUCCESS(
            f'Seeded {Property.objects.count()} properties. Refresh http://127.0.0.1:8000/'
        ))
