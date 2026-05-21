from django.db import models
from admin_panel.models import job_description

class Contact_Enquiry(models.Model):
    enquiry_date = models.DateTimeField()
    full_name = models.CharField(max_length=200, blank=False, default='')
    contact_number = models.CharField(max_length=10, blank=False, default='')
    email = models.CharField(max_length=150, blank=False, default='')
    message = models.CharField(max_length=200, blank=False, default='')
    ip_address = models.GenericIPAddressField()
    enquiry_status = models.CharField(max_length=50, blank=False, default='Pending')

class Property_Enquiry(models.Model):
    enquiry_date = models.DateTimeField()
    full_name = models.CharField(max_length=200, blank=False, default='')
    contact_number = models.CharField(max_length=10, blank=False, default='')
    email = models.CharField(max_length=150, blank=False, default='')
    message = models.CharField(max_length=200, blank=False, default='')
    ip_address = models.GenericIPAddressField()
    enquiry_status = models.CharField(max_length=50, blank=False, default='Pending')
    
class job_applications(models.Model):
    date = models.DateTimeField()
    job_desc = models.ForeignKey(job_description,on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=False, default='')
    number = models.CharField(max_length=10, blank=False, default='')
    email = models.CharField(max_length=150, blank=False, default='')
    city = models.CharField(max_length=200, blank=False, default='')
    document_file_url = models.CharField(max_length=300, blank=False, default='')
    ip_address = models.GenericIPAddressField()