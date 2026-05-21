from admin_panel.views import *
#from django.urls import path
from django.urls import include, re_path
from user_login.urls import *

admin_obj=AdminCls()
emp_obj=EmployeeCls()
prop_obj=PropertyCls()
user_obj=UserProfileCls()
report_obj=ReportCls()
job_obj=JobDescCls()

urlpatterns = [
    re_path(r'^admin_panel$', admin_obj.admin_home, name='admin_home'),

    re_path(r'^profile$', user_obj.showProfile, name='showProfile'),

    re_path(r'^employee$', emp_obj.empPage, name='empPage'),
    re_path(r'^addEmployee$', emp_obj.addEmployee, name='addEmployee'),
    re_path(r'^showEmployees$', emp_obj.showEmployees, name='showEmployees'),
    re_path(r'^getEmployee$', emp_obj.getEmployee, name='getEmployee'),
    re_path(r'^updateEmployee$', emp_obj.updateEmployee, name='updateEmployee'),
    re_path(r'^deleteEmployee$', emp_obj.deleteEmployee, name='deleteEmployee'),
    re_path(r'^changeEmployeeStatus$', emp_obj.changeEmployeeStatus, name='changeEmployeeStatus'),
    re_path(r'^changeEmployeePass$', emp_obj.changeEmployeePass, name='changeEmployeePass'),

    re_path(r'^add-property$', prop_obj.addPropertyPage, name='addPropertyPage'),
    re_path(r'^addProperty$', prop_obj.addProperty, name='addProperty'),
    re_path(r'^property$', prop_obj.propertyPage, name='propertyPage'),
    re_path(r'^showProperties$', prop_obj.showProperties, name='showProperties'),
    re_path(r'^changePropertyStatus$', prop_obj.changePropertyStatus, name='changePropertyStatus'),
    re_path(r'^update-property$', prop_obj.updatePropertyPage, name='updatePropertyPage'),
    re_path(r'^propertyDetails$', prop_obj.detailPropertyPage, name='detailPropertyPage'),
    re_path(r'^updateProperty$', prop_obj.updateProperty, name='updateProperty'),
    re_path(r'^updateRoomConfig$', prop_obj.updateRoomConfig, name='updateRoomConfig'),
    re_path(r'^updatePlaces$', prop_obj.updatePlaces, name='updatePlaces'),
    re_path(r'^updateAmenities$', prop_obj.updateAmenities, name='updateAmenities'),
    re_path(r'^updateFeatures$', prop_obj.updateFeatures, name='updateFeatures'),
    re_path(r'^uploadPropImages$', prop_obj.uploadPropImages, name='uploadPropImages'),
    re_path(r'^updateThumbnail$', prop_obj.updateThumbnail, name='updateThumbnail'),
    re_path(r'^updateRoom$', prop_obj.updateRoom, name='updateRoom'),
    re_path(r'^uploadFloorPlans$', prop_obj.uploadFloorPlans, name='uploadFloorPlans'),
    re_path(r'^uploadVideos$', prop_obj.uploadVideos, name='uploadVideos'),
    re_path(r'^showPropImages$', prop_obj.showPropImages, name='showPropImages'),
    re_path(r'^showRooms$', prop_obj.showRooms, name='showRooms'),
    re_path(r'^showFloorPlans$', prop_obj.showFloorPlans, name='showFloorPlans'),
    re_path(r'^showVideos$', prop_obj.showVideos, name='showVideos'),
    re_path(r'^deletePropImage$', prop_obj.deletePropImage, name='deletePropImage'),
    re_path(r'^deleteRoom$', prop_obj.deleteRoom, name='deleteRoom'),
    re_path(r'^deleteFloorPlans$', prop_obj.deleteFloorPlans, name='deleteFloorPlans'),
    re_path(r'^deleteVideo$', prop_obj.deleteVideo, name='deleteVideo'),
    re_path(r'^deleteProperty$', prop_obj.deleteProperty, name='deleteProperty'),

    re_path(r'^web-contact-report$', report_obj.webContactReport, name='webContactReport'),
    re_path(r'^web-property-enquiry-report$', report_obj.webPropertyEnquiryReport, name='webPropertyEnquiryReport'),
    re_path(r'^showWebContactEnquiries$', report_obj.showWebContactEnquiries, name='showWebContactEnquiries'),
    re_path(r'^showWebPropertyEnquiries$', report_obj.showWebPropertyEnquiries, name='showWebPropertyEnquiries'),
    
    re_path(r'^showJobDescription$', job_obj.showJobDescription, name='showJobDescription'),
    re_path(r'^showJobApplication$', job_obj.showJobApplication, name='showJobApplication'),
    re_path(r'^addJobDescription$', job_obj.addJobDescription, name='addJobDescription'),
    re_path(r'^Add-Job-Description$', job_obj.addJobDescriptionPage, name='addJobDescriptionPage'),
    re_path(r'^Job-Description$', job_obj.JobDescriptionPage, name='JobDescriptionPage'),
    re_path(r'^Job-Application-Report$', job_obj.JobApplicationReport, name='JobApplicationReport'),
    re_path(r'^changeJobDescStatus$', job_obj.changeJobDescStatus, name='changeJobDescStatus'),
    re_path(r'^deleteJobDesc$', job_obj.deleteJobDesc, name='deleteJobDesc'),
    re_path(r'^Update-JobDesc$', job_obj.updateJobDescPage, name='updateJobDesc'),
    re_path(r'^updateJobDesc$', job_obj.updateJobDesc, name='updateJobDesc'),
]