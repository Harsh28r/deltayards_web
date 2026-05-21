from django.db import models
from admin_panel.models import Employee

class LoginReport(models.Model):
    username = models.CharField(max_length=10, blank=False, default='')
    emp = models.ForeignKey(Employee,on_delete=models.SET_DEFAULT,default='undefined')
    ip_address = models.GenericIPAddressField()
    login_date_time = models.DateTimeField()

class ForgotPassword(models.Model):
    request_date = models.DateTimeField()
    email = models.CharField(max_length=100, blank=False, default='')
    # password = models.CharField(max_length=100, blank=False, default='')
    otp = models.CharField(max_length=50, blank=False, default='')