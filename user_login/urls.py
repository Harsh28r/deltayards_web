from user_login.views import *
#from django.urls import path
from django.urls import include, re_path

log_obj=LoginCls()

urlpatterns = [
    re_path(r'^auth-user$', log_obj.login, name='login'),
    re_path(r'^index$', log_obj.showLogin, name='showLogin'),
    re_path(r'^logout$', log_obj.logout, name='logout'),
    re_path(r'^forgot-password$', log_obj.showForgotPass, name='showForgotPass'),
    re_path(r'^generate_otp$', log_obj.generate_otp, name='generate_otp'),
    re_path(r'^verify_otp$', log_obj.verify_otp, name='verify_otp'),
]