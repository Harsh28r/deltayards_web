from sys import implementation
from django.urls import path, re_path
from website import views

enq_obj = views.WebEnquiriesCls()
job_obj = views.JobApplyCls()
urlpatterns = [
    re_path(r'^$',views.home,name='home'),
    re_path(r'^about$',views.about,name='about'),
    re_path(r'^contact$',views.contact,name='contact'),
    re_path(r'^privacy-policy$',views.privacy_policy,name='privacy_policy'),
    re_path(r'^property-listing$',views.property_listing,name='property_grid'),
    re_path(r'^property-details$',views.single,name='single'),
    re_path(r'^services$',views.services,name='services'),
    # re_path(r'^hotdeals$',views.hotdeals,name='hotdeals'),
    re_path(r'^hotdeals$',views.property_listing,name='hotdeals'),
    re_path(r'^news$',views.news,name='news'),
    re_path(r'^delta-yards-corner$',views.delta_yards_corner,name='delta_yards_corner'),
    re_path(r'^certificates$',views.certificate,name='certificate'),
    re_path(r'^contactEnquiry$',enq_obj.contact_enquiry,name='contact_enquiry'),
    re_path(r'^propertyEnquiry$',enq_obj.property_enquiry,name='property_enquiry'),

    re_path(r'^contact-demo$',views.contact_demo,name='contact_demo'),
    re_path(r'^contactInformation$',views.contact_info,name='contact_info'),
    
    re_path(r'^career$',views.career,name='career'),
    re_path(r'^jobApply$',job_obj.job_apply,name='job_apply'),
    re_path(r'^JobDetails$',views.job_details,name='job_details'),
]