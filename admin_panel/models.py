from django.db import models

class User_Role(models.Model):
    type = models.CharField(max_length=50, blank=False, default='')

class Employee(models.Model):
    register_date = models.DateTimeField()
    emp_name = models.CharField(max_length=200, blank=False, default='')
    emp_mob = models.CharField(max_length=10, blank=False, default='',unique=True)
    password_text = models.CharField(max_length=50, blank=False, default='')
    password = models.BinaryField()
    salt = models.BinaryField()
    email = models.CharField(max_length=100, blank=False, default='')
    status = models.CharField(max_length=20, blank=False, default='')
    profile_img = models.CharField(max_length=200, blank=False, default='')
    role = models.ForeignKey(User_Role,on_delete=models.SET_DEFAULT,default='undefined')
    added_by = models.CharField(max_length=50, blank=False, default='')

class Property_Type(models.Model):
    type_name  = models.CharField(max_length=100, blank=False, default='')
    
class Property(models.Model):
    project_name = models.CharField(max_length=200, blank=False, default='',unique=True)
    code_name = models.CharField(max_length=200, blank=False, default='')
    prop_type = models.CharField(max_length=50, blank=False, default='')
    prop_about = models.TextField()
    prop_address = models.CharField(max_length=500, blank=False, default='')
    prop_pincode = models.IntegerField(blank=False,default='0')
    prop_city = models.CharField(max_length=100, blank=False, default='')
    prop_state = models.CharField(max_length=100, blank=False, default='')
    prop_country = models.CharField(max_length=100, blank=False, default='')
    prop_latitude = models.DecimalField(max_digits=20, decimal_places=12, blank=True, null=True)
    prop_longitude = models.DecimalField(max_digits=20, decimal_places=12, blank=True, null=True)
    build_status_ready = models.CharField(max_length=50, blank=False, default='')
    build_status_under = models.CharField(max_length=50, blank=False, default='')
    # build_age = models.CharField(max_length=50, blank=False, default='')
    build_floors = models.IntegerField()
    build_wings = models.IntegerField()
    builder_name = models.CharField(max_length=100, blank=False, default='')
    possesssion_date = models.CharField(max_length=20, blank=False, default='')
    maharera_number = models.CharField(max_length=50, blank=False, default='')
    project_land_parcel = models.CharField(max_length=50, blank=False, default='')
    added_by = models.CharField(max_length=50, blank=False, default='')
    date = models.DateTimeField()
    property_status = models.CharField(max_length=10, blank=False, default='Active')
    unique_id = models.CharField(unique=True, max_length=100, blank=False, default='')
    featured_property=models.CharField(max_length=3, blank=False, default='')
    popular_property=models.CharField(max_length=3, blank=False, default='')
    property_page=models.CharField(max_length=3, blank=False, default='')
    brochure = models.CharField(max_length=300, blank=False, default='')
    # prop_title = models.CharField(max_length=200, blank=False, default='',unique=True)
    # prop_status = models.CharField(max_length=20, blank=False, default='')
    # prop_rooms = models.IntegerField()
    # prop_price = models.IntegerField()
    # prop_carpet_area = models.IntegerField()
    # prop_bedroom = models.IntegerField()
    # prop_bathroom = models.IntegerField()

class Property_Rooms(models.Model):
    date = models.DateTimeField()
    prop_rooms = models.CharField(max_length=50, blank=False, default='')
    prop_carpet_area = models.CharField(max_length=30, blank=False, default='')
    prop_price = models.CharField(max_length=30, blank=False, default='')
    blue_print = models.CharField(max_length=300, blank=False, default='')
    threed_print = models.CharField(max_length=300, blank=False, default='')
    prop = models.ForeignKey(Property,on_delete=models.SET_DEFAULT,default='undefined')
    added_by = models.CharField(max_length=50, blank=False, default='')
    
class Property_Places(models.Model):
    class Meta:
        unique_together = (('place', 'prop'),)
    date = models.DateTimeField()
    place = models.CharField(max_length=100, blank=False, default='')
    place_desc = models.CharField(max_length=700, blank=False, default='')
    prop = models.ForeignKey(Property,on_delete=models.SET_DEFAULT,default='undefined')
    added_by = models.CharField(max_length=50, blank=False, default='')

class Property_Amenities(models.Model):
    class Meta:
        unique_together = (('amenity', 'prop'),)
    date = models.DateTimeField()
    amenity = models.CharField(max_length=100, blank=False, default='')
    amenity_desc = models.CharField(max_length=700, blank=False, default='')
    prop = models.ForeignKey(Property,on_delete=models.SET_DEFAULT,default='undefined')
    added_by = models.CharField(max_length=50, blank=False, default='')

class Property_Features(models.Model):
    class Meta:
        unique_together = (('feature', 'prop'),)
    date = models.DateTimeField()
    feature = models.CharField(max_length=100, blank=False, default='')
    feature_desc = models.CharField(max_length=700, blank=False, default='')
    prop = models.ForeignKey(Property,on_delete=models.SET_DEFAULT,default='undefined')
    added_by = models.CharField(max_length=50, blank=False, default='')

class Property_Images(models.Model):
    date = models.DateTimeField()
    image_url = models.CharField(max_length=300, blank=False, default='')
    image_type = models.CharField(max_length=50, blank=False, default='')
    prop = models.ForeignKey(Property,on_delete=models.SET_DEFAULT,default='undefined')
    added_by = models.CharField(max_length=50, blank=False, default='')

class Property_Floor_Plans(models.Model):
    date = models.DateTimeField()
    image_url = models.CharField(max_length=300, blank=False, default='')
    prop = models.ForeignKey(Property,on_delete=models.SET_DEFAULT,default='undefined')
    added_by = models.CharField(max_length=50, blank=False, default='')

class Property_Videos(models.Model):
    date = models.DateTimeField()
    video_url = models.CharField(max_length=300, blank=False, default='')
    prop = models.ForeignKey(Property,on_delete=models.SET_DEFAULT,default='undefined')
    added_by = models.CharField(max_length=50, blank=False, default='')
    
class job_description(models.Model):
    date = models.DateTimeField()
    title = models.CharField(max_length=200, blank=False, default='')
    description = models.CharField(max_length = 4000,blank = False,default='')
    job_status = models.CharField(max_length=10, blank=False, default='Active')
    unique_id = models.CharField(unique=True, max_length=100, blank=False, default='')