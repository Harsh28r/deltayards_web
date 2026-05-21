from django.db import IntegrityError
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import status
from admin_panel.models import *
from user_login.models import *
import string
import random
#from user_login.views import login
from datetime import datetime
import time
import os
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from django.utils.datastructures import MultiValueDictKeyError
import hashlib
from website.models import job_applications

from website.models import Contact_Enquiry, Property_Enquiry

class Utility:
    def random_string(self,letter_count, digit_count, string_count):
        strings = []
        for i in range(0,string_count):
            str1 = ''.join((random.choice(string.ascii_letters) for x in range(letter_count)))  
            str1 += ''.join((random.choice(string.digits) for x in range(digit_count)))
            sam_list = list(str1) # it converts the string to list.  
            random.shuffle(sam_list) # It uses a random.shuffle() function to shuffle the string.  
            final_string = ''.join(sam_list)  
            strings.append(final_string)
        finalString = '-'.join(strings)
        return finalString  

    def formatINR(self,number):
        s, *d = str(number).partition(".")
        r = ",".join([s[x-2:x] for x in range(-3, -len(s), -2)][::-1] + [s[-3:]])
        return "".join([r] + d)

class EncryptionCls:
    def encryption(self,salt,user_pass):
        key = hashlib.pbkdf2_hmac(
                'sha256', # The hash digest algorithm for HMAC
                user_pass.encode('utf-8'), # Convert the password to bytes
                salt, # Provide the salt
                100000 # It is recommended to use at least 100,000 iterations of SHA-256 
                # dklen=128 # Get a 128 byte key
            )
        # Store them as:
        new_password=salt + key
        return new_password

class AdminCls:
    def admin_home(self,request):
        # if request.session.get('password')is not None and request.session.get('username')is not None:
        if request.session.get('username')is not None:
            return render(request,'dashboard/admin_home.html')
        else:
            return HttpResponseRedirect('index')

class UserProfileCls:
    def showProfile(self,request):
        if request.session.get('username') is not None:
            user=request.session.get('username')
            data=self.getProfile(user)
            return render(request,'dashboard/profile.html',{'list':data})
        else:
            return HttpResponseRedirect('index')

    def getProfile(self,user):
        try: 
            employee=Employee.objects.filter(emp_mob=user)
            report=LoginReport.objects.filter(username=user).order_by('-id')[1:2]

            last_visit = ''
            if len(report) > 0 :
                last_visit = report[0].login_date_time

        except Employee.DoesNotExist: 
            return JsonResponse({'success':'0','message': 'Property does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
        data = {"emp_id":employee[0].id,"emp_name":employee[0].emp_name,"email":employee[0].email,"emp_mob":employee[0].emp_mob,"role_id":employee[0].role_id,"profile_img":employee[0].profile_img,"register_date":employee[0].register_date,"last_visit":last_visit}
        return data
        
class EmployeeCls:
    def empPage(self,request):
        # if request.session.get('password')is not None and request.session.get('username')is not None:
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            role = User_Role.objects.all().filter(id__lt=3)
            return render(request,'dashboard/employee.html',{'role':role})
        else:
            return HttpResponseRedirect('index')

    def addEmployee(self,request):
        # if request.session.get('password')is not None and request.session.get('username')is not None:
        if request.session.get('username')is not None:
            if request.method == 'POST':
                if 'btn_addEmployee' in request.POST:
                    emp_name = request.POST['emp_name']
                    email = request.POST['email']
                    emp_mob = request.POST['emp_mob']
                    role_id = request.POST['role_id']
                    
                    d = datetime.now()
                    
                    emp_pass = ''
                    for i in range(1,12):
                        emp_pass += random.choice(string.ascii_letters)
                    # print("Password :: ",emp_pass)
                    salt = os.urandom(32)
                    encrypt=EncryptionCls()
                    new_pass=encrypt.encryption(salt,emp_pass)
                    # print("Insert Salt :: ",salt)
                    # print("Insert Pass :: ",new_pass)
                    
                    file_url="profile_img/no-image.png"
                    
                    fss=""
                    filename=""
                    try:
                        if request.FILES['profile_img']:
                            profile_img = request.FILES['profile_img']

                            if not os.path.exists(self.get_image_path("profile_img",os.path.join(settings.MEDIA_ROOT,self.get_image_path("profile_img",'')))):
                                os.makedirs(self.get_image_path("profile_img",os.path.join(settings.MEDIA_ROOT, self.get_image_path("profile_img",''))))
                            
                            fss = FileSystemStorage(os.path.join(settings.MEDIA_ROOT,"profile_img"))
                            filename=profile_img.name
                            file_url = "profile_img/"+filename
                    except MultiValueDictKeyError:
                        pass

                    if (emp_name and email and emp_mob and role_id) is not None:
                        try:
                            insertData = Employee.objects.create(
                                emp_name = emp_name,
                                email = email,
                                emp_mob = emp_mob,
                                role = User_Role.objects.get(id=role_id),
                                register_date = d,
                                added_by = request.session.get('username'),
                                status = 'Active',
                                password = new_pass,
                                password_text = emp_pass,
                                salt = bytes(repr(salt)[2:-1],'ISO-8859-1'),
                                profile_img=file_url
                            )
                            if insertData:
                                # # send mail to employee
                                # mail_message='<p>Dear '+emp_name+',<br/>Greetings from PropertyStop<br/><br/>Please find credential for Dashboard.<br/><strong>Username :</strong> '+emp_mob+'<br/><strong>Password :</strong> '+emp_pass+'<br><br/>Regards,<br/>PropertyStop</p>'
                                # # print('---------------',mail_message)
                                # mail_subject='Dashboard Details | PropertyStop'
                                # send_mail=SendMailCls()
                                # send_mail.sendMail(mail_message,mail_subject,email)

                                #save file after data stored
                                try:
                                    if request.FILES['profile_img']:
                                        fss.save(filename, profile_img)
                                except MultiValueDictKeyError:
                                    pass
                                return JsonResponse({'success':'1','message':'Employee added successfully...'}, status=status.HTTP_200_OK)
                            else:
                                return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
                        except IntegrityError:
                            return JsonResponse({'success':'0','message':'Entered employee is already present. Add another!!!'}, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def showEmployees(self,request):
        if request.method == 'GET':
            all_employee=Employee.objects.all().exclude(role=1).order_by('-id').select_related('role')
            data=[]
            sr_no=0
            for i in all_employee:
                sr_no+=1
                cls = 'primary'
                if i.status == 'Active':
                    cls = 'success'
                    icon = 'unlock'
                    stat = 'Active'
                else:
                    cls = 'danger'
                    icon = 'lock'
                    stat = 'Deactive'
                
                cls1="default"

                if i.role.id == 1:
                    cls1 = 'primary'
                elif i.role.id == 2:
                    cls1 = 'info'
                elif i.role.id == 3:
                    cls1 = 'warning'
                elif i.role.id == 4:
                    cls1 = 'danger'
                data.append({'sr_no':sr_no,'emp_id':i.id, 'emp_name':i.emp_name, 'email':i.email, 'emp_mob':i.emp_mob, 'profile_img':i.profile_img, 'register_date':i.register_date.strftime('%d-%m-%Y'),'role':i.role.type,'status':stat,'cls':cls,'cls1':cls1,'icon':icon})
            return JsonResponse(data, status=status.HTTP_200_OK,safe=False)

    def deleteEmployee(self,request):
        if request.method == 'POST':
            if 'employee' in request.POST:
                id=request.POST['id']
                try: 
                    employee = Employee.objects.get(pk=id) 
                except Employee.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Employee does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
                employee.delete() 
                return JsonResponse({'success':'1','message': 'Employee deleted successfully...'}, status=status.HTTP_200_OK)

    def updateEmployee(self,request):
        if request.method == 'POST':
            if 'btn_updateEmployee' in request.POST:
                id=request.POST['emp_id']
                emp_name = request.POST['emp_name']
                email = request.POST['email']
                emp_mob = request.POST['emp_mob']
                role_id = request.POST['role_id']

                file_url=request.POST['old_profile_img']
                    
                fss=""
                filename=""
                try:
                    if request.FILES['profile_img']:
                        profile_img = request.FILES['profile_img']

                        if not os.path.exists(self.get_image_path("profile_img",os.path.join(settings.MEDIA_ROOT, self.get_image_path("profile_img",'')))):
                            os.makedirs(self.get_image_path("profile_img",os.path.join(settings.MEDIA_ROOT, self.get_image_path("profile_img",''))))
                        
                        fss = FileSystemStorage(os.path.join(settings.MEDIA_ROOT,"profile_img"))
                        filename=profile_img.name
                        file_url = "profile_img/"+filename
                except MultiValueDictKeyError:
                    pass

                try: 
                    employee = Employee.objects.get(pk=id) 
                    if employee:
                        if (emp_name and email and emp_mob and role_id) is not None:
                            employee.emp_name = emp_name
                            employee.email = email
                            employee.emp_mob = emp_mob
                            employee.role_id = User_Role.objects.get(id=role_id)
                            employee.profile_img = file_url
                            employee.save(update_fields=['emp_name','email','emp_mob','role_id','profile_img'])
                            try:
                                if request.FILES['profile_img']:
                                    fss.save(filename, profile_img)

                                    if request.POST['old_profile_img'] != 'profile_img/no-image.png':
                                        if os.path.exists("media/"+request.POST['old_profile_img']):
                                            os.remove("media/"+request.POST['old_profile_img'])

                            except MultiValueDictKeyError:
                                pass
                            return JsonResponse({'success':'1','message':'Employee data updated successfully...'}, status=status.HTTP_200_OK)
                        return JsonResponse({'success':'0','message':'Please check all the fields data properly!!!'}, status=status.HTTP_400_BAD_REQUEST)
                except Employee.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Employee does not exists!!!'}, status=status.HTTP_404_NOT_FOUND)
                except IntegrityError:
                    return JsonResponse({'success':'0','message':'Entered employee is already present. Add another!!!'}, status=status.HTTP_200_OK)
                return JsonResponse({'success':'0','message':'Something went wrong. Please try again later!!!'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            return HttpResponse('You are not allowed to send data!!!')

    def changeEmployeeStatus(self,request):
        if request.method == 'POST':
            if 'changeEmployeeStatus' in request.POST:
                id=request.POST['id']
                try: 
                    data = Employee.objects.get(pk=id) 
                except Employee.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Employee does not exists!!!'}, status=status.HTTP_404_NOT_FOUND)
                if data:
                    stat = ''
                    if data.status == 'Active':
                        stat = 'Deactive'
                    else:
                        stat = 'Active'
                    data.status=stat
                    data.save(update_fields=['status'])
                    return JsonResponse({'success':'1','message':'Employee data updated successfully...'}, status=status.HTTP_200_OK)
            return HttpResponse('You are not allowed to send data')
        return HttpResponse('You are not allowed to send data')

    def changeEmployeePass(self,request):
        if request.method == 'POST':
            if 'btn_changeEmpPass' in request.POST:
                emp_id=request.POST['emp_id']
                try: 
                    data = Employee.objects.get(pk=emp_id) 
                except Employee.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Employee does not exists!!!'}, status=status.HTTP_404_NOT_FOUND)
                if data:
                    emp_pass=request.POST['emp_pass']

                    salt = os.urandom(32)
                    encrypt=EncryptionCls()
                    new_pass=encrypt.encryption(salt,emp_pass)

                    new_salt = bytes(repr(salt)[2:-1],'ISO-8859-1')

                    data.password=new_pass
                    data.password_text=emp_pass
                    data.salt=new_salt
                    data.save(update_fields=['password','password_text','salt'])
                    return JsonResponse({'success':'1','message':'Employee data updated successfully...'}, status=status.HTTP_200_OK)
            else:
                return HttpResponse('You are not allowed to send data')
        else:
            return HttpResponse('You are not allowed to send data to this page')

    def getEmployee(self,request):
        if request.method == 'POST':
            if 'employee' in request.POST:
                id=request.POST['id']
                try: 
                    employee = Employee.objects.get(pk=id) 
                except Employee.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Employee does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
                data = {"emp_id":employee.id,"emp_name":employee.emp_name,"email":employee.email,"emp_mob":employee.emp_mob,"role_id":employee.role_id,"profile_img":employee.profile_img}
                return JsonResponse({'success':'1','message': 'Employee data updated successfully...','data':data}, status=status.HTTP_200_OK,safe=False)

    def get_image_path(self,foldername,mediapath):
        return os.path.join(foldername, mediapath)

class PropertyCls:
    id=None
    # prop_status_lst=['Sell','Buy']
    # prop_type_lst=['Flat','Commercial','Apartment','Lot','Garage']
    prop_type_lst=[]
    prop_rooms_lst=['1 BHK','2 BHK','3 BHK','4 BHK','5 BHK','6 BHK','7 BHK','8 BHK','9 BHK','10 BHK']
    # build_status_lst=['Ready to Move','Under Construction']
    # build_age_lst=['0-2 Years','3-5 Years','8-10 Years','11-15 Years','16-20 Years']
    # prop_bedroom_lst=[1,2,3,4,5,6]
    # prop_bathroom_lst=[1,2,3,4,5,6]
    near_by_places=['Park/Garden','Amusement Park/Resort','School/Play School','Restaurants/Bar','Railway Station','Airport','Sea Shore','Bus Stop','Club House/Game Station','Bank/ATM','Any Popular/Essential Place']
    by_amenities=['Swimming Pool','Laundry Room','Gym','Fire Alarm','Reserved Parking','Visitor Parking','CCTV Camera','Power Back Up','Lift','Earth quake resistant','Security','Aesthetically designed landscape','Jogging and Strolling Track','Any other Amenity']
    by_features=['Balcony','TV Cable & WIFI','Microwave','Air Conditioning','Window Covering','Modular Kitchen','Piped Gas','Central Heating','Fully Furnished','Semi Furnished','Stylish Bathroom','Any Household asset']

    def getPropType(self):
        pt=Property_Type.objects.values_list('type_name', flat=True)
        return list(pt)

    def addPropertyPage(self,request):
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            return render(request,'dashboard/add-property.html',{'prop_type_lst':self.getPropType()})
        else:
            return HttpResponseRedirect('index')

    def propertyPage(self,request):
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            return render(request,'dashboard/property.html')
        else:
            return HttpResponseRedirect('index')

    def detailPropertyPage(self,request):
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            ut=Utility()
            unique_id = request.GET['id']
            property_details = Property.objects.filter(unique_id__exact = unique_id)
            prop_data = []
            imgs = []
            amen = []
            place = []
            floors = []
            features = []
            rooms = []

            for i in property_details:
                prop_data.append({'id':i.id,'project_name':i.project_name,'prop_type':i.prop_type,'prop_address':i.prop_address,'prop_city':i.prop_city,'prop_pincode':i.prop_pincode,'prop_state':i.prop_state,'prop_country':i.prop_country,'build_floors':i.build_floors,'build_wings':i.build_wings,'builder_name':i.builder_name,'possesssion_date':i.possesssion_date,'prop_about':i.prop_about,'prop_latitude':i.prop_latitude,'prop_longitude':i.prop_longitude,'maharera_number':i.maharera_number,'property_status':i.property_status,'unique_id':i.unique_id,'build_status_ready':i.build_status_ready})

                try:
                    prop_img = Property_Images.objects.filter(prop_id__exact = i.id).values('image_url')
                    ct=0
                    for im in range(len(prop_img)):
                        imgs.append({"id":ct,"url":prop_img[im]['image_url']})
                        ct+=1
                except Property_Images.DoesNotExist:
                    pass

                try:
                    floor_img = Property_Floor_Plans.objects.filter(prop_id__exact = i.id).values('image_url')
                    ct=0
                    for im in range(len(floor_img)):
                        floors.append({"id":ct,"url":floor_img[im]['image_url']})
                        ct+=1
                except Property_Floor_Plans.DoesNotExist:
                    pass

                try:
                    prop_amenity = Property_Amenities.objects.filter(prop_id__exact = i.id).values('amenity')
                    for am in range(len(prop_amenity)):
                        amen.append({'amen':prop_amenity[am]['amenity']})
                except Property_Amenities.DoesNotExist:
                    pass
                try:
                    prop_near = Property_Places.objects.filter(prop_id__exact = i.id).values('place','place_desc')
                    for pn in range(len(prop_near)):
                        place.append({'place':prop_near[pn]['place'],'desc':prop_near[pn]['place_desc']})
                except Property_Places.DoesNotExist:
                    pass

                try:
                    prop_feature = Property_Features.objects.filter(prop_id__exact = i.id).values('feature')
                    for fe in range(len(prop_feature)):
                        features.append({'feature':prop_feature[fe]['feature']})
                except Property_Features.DoesNotExist:
                    pass

                try:
                    prop_rooms = Property_Rooms.objects.filter(prop_id__exact = i.id).values('prop_rooms','prop_carpet_area','prop_price','blue_print','threed_print')
                    for rm in range(len(prop_rooms)):
                        rooms.append({'prop_rooms':prop_rooms[rm]['prop_rooms'],'prop_carpet_area':prop_rooms[rm]['prop_carpet_area'],'prop_price':ut.formatINR(prop_rooms[rm]['prop_price']),'blue_print':prop_rooms[rm]['blue_print'],'threed_print':prop_rooms[rm]['threed_print']})
                except Property_Rooms.DoesNotExist:
                    pass

            return render(request,'dashboard/property-details.html',{'prop_data':prop_data,'images':imgs,'amenity':amen, 'places':place,'floors':floors,'features':features,'rooms':rooms})
        else:
            return HttpResponseRedirect('index')

    def updatePropertyPage(self,request):
        self.id=request.GET['id']
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            data=self.getProperty()
            # print(data)
            # return render(request,'dashboard/update-property.html',{'data':data,'prop_status_lst':self.prop_status_lst,'prop_type_lst':self.prop_type_lst,'prop_rooms_lst':self.prop_rooms_lst,'build_status_lst':self.build_status_lst,'build_age_lst':self.build_age_lst,'prop_bedroom_lst':self.prop_bedroom_lst,'prop_bathroom_lst':self.prop_bathroom_lst})
            return render(request,'dashboard/update-property.html',{'data':data,'prop_type_lst':self.getPropType(),'prop_rooms_lst':self.prop_rooms_lst})
        else:
            return HttpResponseRedirect('index')

    def addProperty(self,request):
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            if request.method == 'POST':
                if 'btn_addProperty' in request.POST:

                    unique_id = Utility().random_string(4,3,7)
                    unique_id = unique_id+str(int(time.time()))

                    project_name = request.POST['project_name']
                    code_name = request.POST['code_name']
                    prop_type = 'Flat'
                    # prop_type = request.POST['prop_type']
                    prop_about = request.POST['prop_about']
                    prop_address = request.POST['prop_address']
                    prop_pincode = request.POST['prop_pincode']
                    prop_city = request.POST['prop_city']
                    prop_state = request.POST['prop_state']
                    prop_country = request.POST['prop_country']

                    if request.POST['prop_latitude']=='':
                        prop_latitude=0
                    else:
                        prop_latitude = request.POST['prop_latitude']

                    if request.POST['prop_longitude']=='':
                        prop_longitude=0
                    else:
                        prop_longitude = request.POST['prop_longitude']

                    # build_status = request.POST['build_status']
                    # build_age = request.POST['build_age']

                    if request.POST.get('ready_to_move'):
                        ready_to_move=request.POST['ready_to_move']

                        if request.POST['build_floors']=='':
                            build_floors=0
                        else:
                            build_floors = request.POST['build_floors']

                        if request.POST['build_wings']=='':
                            build_wings=0
                        else:
                            build_wings = request.POST['build_wings']
                    else:
                        ready_to_move=''
                        build_floors=0
                        build_wings=0

                    if request.POST.get('under_construction'):
                        under_construction=request.POST['under_construction']
                        possesssion_date = datetime.strptime(request.POST['possesssion_date'],'%Y-%m').strftime('%B, %Y')
                    else:
                        under_construction=''
                        possesssion_date=''

                    builder_name = request.POST['builder_name']
                    
                    maharera_number = request.POST['maharera_number'] 

                    # prop_title = request.POST['prop_title']
                    # prop_status = request.POST['prop_status']
                    
                    # if request.POST['prop_rooms']=='':
                    #     prop_rooms=0
                    # else:
                    #     prop_rooms = request.POST['prop_rooms']
                    # if request.POST['prop_price']=='':
                    #     prop_price=0
                    # else:
                    #     prop_price = request.POST['prop_price']
                    # if request.POST['prop_carpet_area']=='':
                    #     prop_carpet_area=0
                    # else:
                    #     prop_carpet_area = request.POST['prop_carpet_area']
                    
                    
                    # if request.POST['prop_bedroom']=='':
                    #     prop_bedroom=0
                    # else:
                    #     prop_bedroom = request.POST['prop_bedroom']
                    # if request.POST['prop_bathroom']=='':
                    #     prop_bathroom=0
                    # else:
                    #     prop_bathroom = request.POST['prop_bathroom']
                    
                    d = datetime.now()
                    
                    if (project_name) is not None:
                        # try:
                            insertData = Property.objects.create(
                                unique_id=unique_id,
                                project_name = project_name,
                                code_name = code_name,
                                prop_about = prop_about,
                                prop_type = prop_type,
                                prop_address = prop_address,
                                prop_pincode=prop_pincode,
                                prop_city = prop_city,
                                prop_state = prop_state,
                                prop_country = prop_country,
                                prop_latitude = prop_latitude,
                                prop_longitude = prop_longitude,
                                # build_status = build_status,
                                # build_age = build_age,
                                build_status_ready = ready_to_move,
                                build_status_under = under_construction,
                                build_floors = build_floors,
                                build_wings = build_wings,
                                builder_name = builder_name,
                                possesssion_date = possesssion_date,
                                maharera_number = maharera_number,
                                date = d,
                                added_by = request.session.get('username'),
                                property_status = 'Active',
                                featured_property = 'No',
                                popular_property = 'No',
                                property_page = 'No'
                            )
                            if insertData:
                                LastInsertId = (Property.objects.last()).id
                                return JsonResponse({'success':'1','message':'Property added successfully...',"prop_id":LastInsertId}, status=status.HTTP_200_OK)
                            else:
                                return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
                        # except IntegrityError:
                        #     return JsonResponse({'success':'0','message':'Entered property is already present. Add another!!!'}, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def showProperties(self,request):
        if request.method == 'GET':
            all_properties=Property.objects.all().order_by('-id')
            data=[]
            sr_no=0
            for i in all_properties:
                sr_no+=1
                cls = 'primary'
                if i.property_status == 'Active':
                    cls = 'success'
                    icon = 'unlock'
                    stat = 'Active'
                else:
                    cls = 'danger'
                    icon = 'lock'
                    stat = 'Deactive'
                
                data.append({'sr_no':sr_no,'prop_id':i.id, 'prop_title':i.project_name, 'code_name':i.code_name, 'maharera_number':i.maharera_number, 'prop_type':i.prop_type, 'possesssion_date':i.possesssion_date,'builder_name':i.builder_name,'featured_property':i.featured_property,'popular_property':i.popular_property,'property_page':i.property_page,'property_status':stat,'cls':cls,'icon':icon,'unique_id':i.unique_id})
            return JsonResponse(data, status=status.HTTP_200_OK,safe=False)  

    def changePropertyStatus(self,request):
        if request.method == 'POST':
            if 'changePropertyStatus' in request.POST:
                id=request.POST['id']
                try: 
                    data = Property.objects.get(pk=id) 
                except Property.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Property does not exists!!!'}, status=status.HTTP_404_NOT_FOUND)
                if data:
                    stat = ''
                    if data.property_status == 'Active':
                        stat = 'Deactive'
                    else:
                        stat = 'Active'
                    data.property_status=stat
                    data.save(update_fields=['property_status'])
                    return JsonResponse({'success':'1','message':'Property data updated successfully...'}, status=status.HTTP_200_OK)
            return HttpResponse('You are not allowed to send data')
        return HttpResponse('You are not allowed to send data')
    
    def getProperty(self):
        try: 
            prop = Property.objects.get(pk=self.id) 
            # prop_places=Property_Places.objects.select_related().filter(prop = self.id)
            prop_rooms=Property_Rooms.objects.filter(prop = self.id)
            prop_places=Property_Places.objects.filter(prop = self.id)
            prop_amenities=Property_Amenities.objects.filter(prop = self.id)
            prop_features=Property_Features.objects.filter(prop = self.id)
            prop_images=Property_Images.objects.filter(prop = self.id).exclude(image_type = 'Thumbnail').order_by('-id')
            prop_floor_plan=Property_Floor_Plans.objects.filter(prop = self.id).order_by('-id')
            prop_video=Property_Videos.objects.filter(prop = self.id).order_by('-id')
            prop_thumb=Property_Images.objects.filter(prop = self.id).filter(image_type = 'Thumbnail')
        except Property.DoesNotExist: 
            return JsonResponse({'success':'0','message': 'Property does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 

        rooms_lst=[]
        places_lst=[]
        amenities_lst=[]
        features_lst=[]
        images_lst=[]
        floor_lst=[]
        video_lst=[]

        thumbnail = []
        if len(prop_thumb)>0:
            for pt in prop_thumb:
                thumbnail.append({"image_url":pt.image_url,"image_id":pt.id})

        if len(prop_rooms)>0:
            for room in prop_rooms:
                rooms_lst.append({"room_id":room.id,"prop_rooms":room.prop_rooms,"prop_carpet_area":room.prop_carpet_area,"prop_price":room.prop_price,"blue_print":room.blue_print,"threed_print":room.threed_print})

        for lst in self.near_by_places:
            flag=0
            for places in prop_places:
                if lst==places.place:
                    places_lst.append({"place_id":places.id,"place_name":places.place,"place_desc":places.place_desc})
                    flag=1
            if flag==0:
                places_lst.append({"place_id":"NA","place_name":lst,"place_desc":"NA"})

        for amt in self.by_amenities:
            flag=0
            for amenities in prop_amenities:
                if amt==amenities.amenity:
                    amenities_lst.append({"amenity_id":amenities.id,"amenity_name":amenities.amenity,"amenity_desc":amenities.amenity_desc})
                    flag=1
            if flag==0:
                amenities_lst.append({"amenity_id":"NA","amenity_name":amt,"amenity_desc":"NA"})

        for fea in self.by_features:
            flag=0
            for features in prop_features:
                if fea==features.feature:
                    features_lst.append({"feature_id":features.id,"feature_name":features.feature,"feature_desc":features.feature_desc})
                    flag=1
            if flag==0:
                features_lst.append({"feature_id":"NA","feature_name":fea,"feature_desc":"NA"})    

        for img in prop_images:
            images_lst.append({"image_id":img.id,"image_url":img.image_url})

        for floor in prop_floor_plan:
            floor_lst.append({"image_id":floor.id,"image_url":floor.image_url})

        for video in prop_video:
            video_lst.append({"video_id":video.id,"video_url":video.video_url})
                    
        # data = {"prop_id":prop.id,"prop_title":prop.prop_title,"prop_about":prop.prop_about,"prop_status":prop.prop_status,"prop_type":prop.prop_type,"prop_rooms":prop.prop_rooms,"prop_price":prop.prop_price,"prop_carpet_area":prop.prop_carpet_area,"prop_address":prop.prop_address,"prop_city":prop.prop_city,"prop_state":prop.prop_state,"prop_country":prop.prop_country,"prop_latitude":prop.prop_latitude,"prop_longitude":prop.prop_longitude,"prop_bedroom":prop.prop_bedroom,"prop_bathroom":prop.prop_bathroom,"build_floors":prop.build_floors,"build_wings":prop.build_wings,"build_status":prop.build_status,"build_age":prop.build_age,"builder_name":prop.builder_name,"project_name":prop.project_name,"possesssion_date":prop.possesssion_date,"maharera_number":prop.maharera_number,"places":places_lst,"amenities":amenities_lst,"features":features_lst,"images":images_lst}
        possession_date = ''
        if prop.possesssion_date!='':
            possession_date=datetime.strptime(prop.possesssion_date,'%B, %Y').strftime('%Y-%m')
        data = {"prop_id":prop.id,"unique_id":prop.unique_id,'code_name':prop.code_name,"prop_about":prop.prop_about,"prop_type":prop.prop_type,"prop_address":prop.prop_address,"prop_city":prop.prop_city,"prop_pincode":prop.prop_pincode,"prop_state":prop.prop_state,"prop_country":prop.prop_country,"prop_latitude":prop.prop_latitude,"prop_longitude":prop.prop_longitude,"build_floors":prop.build_floors,"build_wings":prop.build_wings,"build_status_ready":prop.build_status_ready,"build_status_under":prop.build_status_under,"builder_name":prop.builder_name,"project_name":prop.project_name,"possesssion_date":possession_date,"maharera_number":prop.maharera_number,"project_land_parcel":prop.project_land_parcel,"featured_property":prop.featured_property,"popular_property":prop.popular_property,"property_page":prop.property_page,"brochure":prop.brochure,"places":places_lst,"amenities":amenities_lst,"features":features_lst,"images":images_lst,"rooms":rooms_lst,"floors":floor_lst,"thumbnail":thumbnail,"videos":video_lst}
        return data

    def showPropImages(self,request):
        if request.method == 'POST':
            # print('-------',request.POST['prop_id'])
            self.id=int(request.POST['prop_id'])
            all_images=Property_Images.objects.filter(prop = self.id).exclude(image_type='Thumbnail').order_by('-id')
            data=[]
            for i in all_images:
                data.append({'image_id':i.id, 'image_url':i.image_url})
            return JsonResponse(data, status=status.HTTP_200_OK,safe=False)  

    def showFloorPlans(self,request):
        if request.method == 'POST':
            self.id=int(request.POST['prop_id'])
            all_images=Property_Floor_Plans.objects.filter(prop = self.id).order_by('-id')
            data=[]
            for i in all_images:
                data.append({'image_id':i.id, 'image_url':i.image_url})
            return JsonResponse(data, status=status.HTTP_200_OK,safe=False)  

    def showVideos(self,request):
        if request.method == 'POST':
            self.id=int(request.POST['prop_id'])
            all_images=Property_Videos.objects.filter(prop = self.id).order_by('-id')
            data=[]
            for i in all_images:
                data.append({'video_id':i.id, 'video_url':i.video_url})
            return JsonResponse(data, status=status.HTTP_200_OK,safe=False)  

    def updateProperty(self,request):
        if request.method == 'POST':
            if 'btn_updateProperty' in request.POST:
                id=request.POST['prop_id']
                project_name1 = request.POST['project_name']
                code_name1 = request.POST['code_name']
                prop_type1 = 'Flat'
                # prop_type1 = request.POST['prop_type']
                prop_about1 = request.POST['prop_about']
                prop_address1 = request.POST['prop_address']
                prop_pincode1 = request.POST['prop_pincode']
                prop_city1 = request.POST['prop_city']
                prop_state1 = request.POST['prop_state']
                prop_country1 = request.POST['prop_country']

                if request.POST['prop_latitude']=='':
                    prop_latitude1=0
                else:
                    prop_latitude1 = request.POST['prop_latitude']

                if request.POST['prop_longitude']=='':
                    prop_longitude1=0
                else:
                    prop_longitude1 = request.POST['prop_longitude']

                
                # build_status1 = request.POST['build_status']
                # build_age1 = request.POST['build_age']

                if request.POST.get('ready_to_move'):
                    ready_to_move1=request.POST['ready_to_move']

                    if request.POST['build_floors']=='':
                        build_floors1=0
                    else:
                        build_floors1 = request.POST['build_floors']

                    if request.POST['build_wings']=='':
                        build_wings1=0
                    else:
                        build_wings1 = request.POST['build_wings']
                else:
                    ready_to_move1=''
                    build_floors1=0
                    build_wings1=0

                if request.POST.get('under_construction'):
                    under_construction1=request.POST['under_construction']
                    if request.POST['possesssion_date']!='':
                        possesssion_date1 = datetime.strptime(request.POST['possesssion_date'],'%Y-%m').strftime('%B, %Y')
                else:
                    under_construction1=''
                    possesssion_date1=''

                builder_name1 = request.POST['builder_name']
                maharera_number1 = request.POST['maharera_number'] 
                project_land_parcel = request.POST['project_land_parcel'] 

                if request.POST.get('featured_property'):
                    featured_property='Yes'
                else:
                    featured_property='No'

                if request.POST.get('popular_property'):
                    popular_property='Yes'
                else:
                    popular_property='No'

                if request.POST.get('property_page'):
                    property_page='Yes'
                else:
                    property_page='No'

                if not os.path.exists(self.get_image_path("property-images/"+id+"/doc",os.path.join(settings.MEDIA_ROOT,self.get_image_path("property-images/"+id+"/doc",'')))):
                    os.makedirs(self.get_image_path("property-images/"+id+"/doc",os.path.join(settings.MEDIA_ROOT, self.get_image_path("property-images/"+id+"/doc",''))))

                brochure_url=request.POST['old_brochure']
                fss=""
                brochure_name=""

                try:
                    brochure=request.FILES['brochure']
                    fss = FileSystemStorage(os.path.join(settings.MEDIA_ROOT,"property-images/"+id+"/doc"))
                    brochure_name='brochure_'+str(random.randint(100000,999999))+'.pdf'
                    brochure_url = "property-images/"+id+"/doc"+"/"+brochure_name
                    fss.save(brochure_name, brochure)
                    if request.POST['old_brochure']!='':
                        if os.path.exists("media/"+request.POST['old_brochure']):
                            os.remove("media/"+request.POST['old_brochure']) 
                except:
                    brochure_url=request.POST['old_brochure']

                # prop_title1 = request.POST['prop_title']
                
                # prop_status1 = request.POST['prop_status']
                
                # if request.POST['prop_rooms']=='':
                #     prop_rooms1=0
                # else:
                #     prop_rooms1 = request.POST['prop_rooms']
                # if request.POST['prop_price']=='':
                #     prop_price1=0
                # else:
                #     prop_price1 = request.POST['prop_price']
                # if request.POST['prop_carpet_area']=='':
                #     prop_carpet_area1=0
                # else:
                #     prop_carpet_area1 = request.POST['prop_carpet_area']
                
                # if request.POST['prop_bedroom']=='':
                #     prop_bedroom1=0
                # else:
                #     prop_bedroom1 = request.POST['prop_bedroom']
                # if request.POST['prop_bathroom']=='':
                #     prop_bathroom1=0
                # else:
                #     prop_bathroom1 = request.POST['prop_bathroom']
                
                try: 
                    prop = Property.objects.get(pk=id) 
                    if prop:
                        if (project_name1) is not None:
                            prop.project_name = project_name1
                            prop.code_name = code_name1
                            prop.prop_type = prop_type1
                            prop.prop_about = prop_about1
                            prop.prop_address = prop_address1
                            prop.prop_pincode = prop_pincode1
                            prop.prop_city = prop_city1
                            prop.prop_state = prop_state1
                            prop.prop_country = prop_country1
                            prop.prop_latitude = prop_latitude1
                            prop.prop_longitude = prop_longitude1
                            prop.build_floors = build_floors1
                            prop.build_wings = build_wings1
                            # prop.build_status = build_status1
                            # prop.build_age = build_age1
                            prop.build_status_ready = ready_to_move1
                            prop.build_status_under = under_construction1
                            prop.builder_name = builder_name1
                            prop.possesssion_date = possesssion_date1
                            prop.maharera_number = maharera_number1
                            prop.project_land_parcel = project_land_parcel
                            prop.featured_property = featured_property
                            prop.popular_property = popular_property
                            prop.property_page = property_page
                            prop.brochure = brochure_url
                            
                            # prop.save(update_fields=['prop_title','prop_about','prop_status','prop_type','prop_rooms','prop_price','prop_carpet_area','prop_address','prop_city','prop_state','prop_country','prop_latitude','prop_longitude','prop_bedroom','prop_bathroom','build_floors','build_wings','build_status','build_age','builder_name','project_name','possesssion_date','maharera_number'])

                            prop.save(update_fields=['project_name','prop_type','prop_about','prop_address','prop_city','prop_state','prop_country','prop_latitude','prop_longitude','build_floors','build_wings','build_status_ready','build_status_under','builder_name','possesssion_date','maharera_number','project_land_parcel','prop_pincode','featured_property','popular_property','property_page','code_name','brochure'])

                            return JsonResponse({'success':'1','message':'Property data updated successfully...'}, status=status.HTTP_200_OK)
                        return JsonResponse({'success':'0','message':'Please check all the fields data properly!!!'}, status=status.HTTP_400_BAD_REQUEST)
                except Property.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Property does not exists!!!'}, status=status.HTTP_404_NOT_FOUND)
                except IntegrityError:
                    return JsonResponse({'success':'0','message':'Entered property is already present. Add another!!!'}, status=status.HTTP_200_OK)
                return JsonResponse({'success':'0','message':'Something went wrong. Please try again later!!!'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            return HttpResponse('You are not allowed to send data!!!')

    def updateRoomConfig(self,request):
        if request.session.get('username')is not None:
            if request.method == 'POST':
                if 'prop_id' in request.POST:
                    prop_id=request.POST['prop_id']
                    u_id=request.POST.getlist('u_id')

                    d = datetime.now()

                    if len(u_id)>0:
                        for uid in u_id:
                            try:
                                prop_rooms=request.POST['prop_rooms_'+uid]
                            except IndexError:
                                prop_rooms=''

                            if prop_rooms!='':

                                try:
                                    prop_carpet_area=request.POST['prop_carpet_area_'+uid]
                                except:
                                    prop_carpet_area=''

                                try:
                                    prop_price=request.POST['prop_price_'+uid]
                                except:
                                    prop_price=''

                                if not os.path.exists(self.get_image_path("property-images/"+prop_id+"/room-config/"+prop_rooms,os.path.join(settings.MEDIA_ROOT,self.get_image_path("property-images/"+prop_id+"/room-config/"+prop_rooms,'')))):
                                    os.makedirs(self.get_image_path("property-images/"+prop_id+"/room-config/"+prop_rooms,os.path.join(settings.MEDIA_ROOT, self.get_image_path("property-images/"+prop_id+"/room-config/"+prop_rooms,''))))

                                blue_print_file_url=""
                                threed_print_file_url=""
                                fss=""
                                blue_print_name=""
                                threed_print_name=""

                                fss = FileSystemStorage(os.path.join(settings.MEDIA_ROOT,"property-images/"+prop_id+"/room-config/"+prop_rooms))

                                try:
                                    blue_prints=request.FILES['blue_print_'+uid]
                                    blue_print = blue_prints
                                    blue_print_name='blue_print_'+str(random.randint(100000,999999))+'.png'
                                    blue_print_file_url = "property-images/"+prop_id+"/room-config/"+prop_rooms+"/"+blue_print_name
                                    fss.save(blue_print_name, blue_print)
                                except:
                                    pass

                                try:
                                    threed_prints=request.FILES['threed_print_'+uid]
                                    threed_print = threed_prints
                                    threed_print_name='threed_print_'+str(random.randint(100000,999999))+'.png'
                                    threed_print_file_url = "property-images/"+prop_id+"/room-config/"+prop_rooms+"/"+threed_print_name
                                    fss.save(threed_print_name, threed_print)
                                except:
                                    pass

                                try:
                                    insertData = Property_Rooms.objects.create(
                                        prop_rooms = prop_rooms,
                                        prop_carpet_area = prop_carpet_area,
                                        prop_price = prop_price,
                                        blue_print = blue_print_file_url,
                                        threed_print = threed_print_file_url,
                                        prop = Property.objects.get(id=prop_id),
                                        date = d,
                                        added_by = request.session.get('username')
                                    )
                                except IntegrityError:
                                    pass 

                        return JsonResponse({'success':'1','message':'Rooms updated successfully...'}, status=status.HTTP_200_OK) 
                    else:
                        return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
                else:
                    return JsonResponse({'success':'0','message':'3 Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def updateRoom(self,request):
        # print('-----------------------inside update')
        if request.session.get('username')is not None:
            if request.method == 'POST':
                if 'room_id' in request.POST:
                    room_id=request.POST['room_id']
                    prop_id=request.POST['prop_id']
                    prop_rooms=request.POST['prop_rooms']
                    prop_carpet_area=request.POST['prop_carpet_area']
                    prop_price=request.POST['prop_price']
                    
                    if not os.path.exists(self.get_image_path("property-images/"+prop_id+"/room-config/"+prop_rooms,os.path.join(settings.MEDIA_ROOT,self.get_image_path("property-images/"+prop_id+"/room-config/"+prop_rooms,'')))):
                        os.makedirs(self.get_image_path("property-images/"+prop_id+"/room-config/"+prop_rooms,os.path.join(settings.MEDIA_ROOT, self.get_image_path("property-images/"+prop_id+"/room-config/"+prop_rooms,''))))

                    blue_print_file_url=request.POST['old_blue_print']
                    threed_print_file_url=request.POST['old_threed_print']
                    fss=""
                    blue_print_name=""
                    threed_print_name=""

                    try:
                        blue_print=request.FILES['blue_print']
                        fss = FileSystemStorage(os.path.join(settings.MEDIA_ROOT,"property-images/"+prop_id+"/room-config/"+prop_rooms))
                        blue_print_name='blue_print_'+str(random.randint(100000,999999))+'.png'
                        blue_print_file_url = "property-images/"+prop_id+"/room-config/"+prop_rooms+"/"+blue_print_name
                        fss.save(blue_print_name, blue_print)
                        if request.POST['old_blue_print']!='':
                            if os.path.exists("media/"+request.POST['old_blue_print']):
                                os.remove("media/"+request.POST['old_blue_print']) 
                    except:
                        blue_print_file_url=request.POST['old_blue_print']

                    try:
                        threed_print=request.FILES['threed_print']
                        fss = FileSystemStorage(os.path.join(settings.MEDIA_ROOT,"property-images/"+prop_id+"/room-config/"+prop_rooms))
                        threed_print_name='threed_print_'+str(random.randint(100000,999999))+'.png'
                        threed_print_file_url = "property-images/"+prop_id+"/room-config/"+prop_rooms+"/"+threed_print_name
                        fss.save(threed_print_name, threed_print)
                        if request.POST['old_threed_print']!='':
                            if os.path.exists("media/"+request.POST['old_threed_print']):
                                os.remove("media/"+request.POST['old_threed_print']) 
                    except:
                        threed_print_file_url=request.POST['old_threed_print']

                    try: 
                        prop = Property_Rooms.objects.get(pk=room_id) 
                        if prop:
                            if (prop_rooms) is not None:
                                prop.prop_rooms = prop_rooms
                                prop.prop_carpet_area = prop_carpet_area
                                prop.prop_price = prop_price
                                prop.blue_print = blue_print_file_url
                                prop.threed_print = threed_print_file_url
                            
                                prop.save(update_fields=['prop_rooms','prop_carpet_area','prop_price','blue_print','threed_print'])

                                return JsonResponse({'success':'1','message':'Room data updated successfully...'}, status=status.HTTP_200_OK)
                            return JsonResponse({'success':'0','message':'Please check all the fields data properly!!!'}, status=status.HTTP_400_BAD_REQUEST)
                    except Property_Rooms.DoesNotExist: 
                        return JsonResponse({'success':'0','message': 'Room does not exists!!!'}, status=status.HTTP_404_NOT_FOUND)

            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def showRooms(self,request):
        if request.method == 'POST':
            self.id=request.POST['prop_id']
            all_rooms=Property_Rooms.objects.filter(prop = self.id).order_by('id')
            data=[]
            for room in all_rooms:
                data.append({"room_id":room.id,"prop_rooms":room.prop_rooms,"prop_carpet_area":room.prop_carpet_area,"prop_price":room.prop_price,"blue_print":room.blue_print,"threed_print":room.threed_print})
            return JsonResponse({"data":data,'prop_rooms_lst':self.prop_rooms_lst}, status=status.HTTP_200_OK,safe=False)  

    def deleteRoom(self,request):
        if request.method == 'POST':
            if 'room_config' in request.POST:
                id=request.POST['id']
                blue_print=""
                threed_print=""
                try: 
                    rooms = Property_Rooms.objects.get(pk=id) 
                    blue_print=rooms.blue_print
                    threed_print=rooms.threed_print
                except Property_Rooms.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Rooms does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
                if rooms.delete():
                    if blue_print!='':
                        if os.path.exists("media/"+blue_print):
                            os.remove("media/"+blue_print) 
                    if threed_print!='':
                        if os.path.exists("media/"+threed_print):
                            os.remove("media/"+threed_print) 
                return JsonResponse({'success':'1','message': 'Rooms deleted successfully...'}, status=status.HTTP_200_OK)

    def updatePlaces(self,request):
        if request.session.get('username')is not None:
            if request.method == 'POST':
                if 'btn_updatePlaces' in request.POST:
                    prop_id=request.POST['prop_id']
                    near_by_places=request.POST.getlist('near_by_places')
                    near_by_places_text=request.POST.getlist('near_by_places_text')
                    # near_by_places_id=request.POST.getlist('near_by_places_id')
                    d = datetime.now()
                    if(len(near_by_places)>0):
                        Property_Places.objects.filter(prop=prop_id).delete()
                        for index in range(0,len(near_by_places)):
                            if (near_by_places[index]) is not None:
                                try:
                                    insertData = Property_Places.objects.create(
                                        place = near_by_places[index],
                                        place_desc = near_by_places_text[index],
                                        prop = Property.objects.get(id=prop_id),
                                        date = d,
                                        added_by = request.session.get('username')
                                    )
                                except IntegrityError:
                                    pass
                                    # if near_by_places_id[index] != 0:
                                    #     try:
                                    #         prop_place_data = Property_Places.objects.get(pk=near_by_places_id[index])
                                    #         if prop_place_data:
                                    #             prop_place_data.place = near_by_places[index]
                                    #             prop_place_data.place_desc = near_by_places_text[index]
                                                
                                    #             prop_place_data.save(update_fields=['place','place_desc'])
                                    #     except:
                                    #         pass
                        return JsonResponse({'success':'1','message':'Places updated successfully...'}, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def updateAmenities(self,request):
        if request.session.get('username')is not None:
            if request.method == 'POST':
                if 'btn_updateAmenities' in request.POST:
                    prop_id=request.POST['prop_id']
                    amenities=request.POST.getlist('amenities')
                    d = datetime.now()
                    if(len(amenities)>0):
                        Property_Amenities.objects.filter(prop=prop_id).delete()
                        for index in range(0,len(amenities)):
                            if (amenities[index]) is not None:
                                amenityDesc='NA'
                                if(amenities[index] == 'Any other Amenity'):
                                    amenityDesc=request.POST['other_amenity']
                                try:
                                    insertData = Property_Amenities.objects.create(
                                        amenity = amenities[index],
                                        amenity_desc = amenityDesc,
                                        prop = Property.objects.get(id=prop_id),
                                        date = d,
                                        added_by = request.session.get('username')
                                    )
                                except IntegrityError:
                                    pass
                        return JsonResponse({'success':'1','message':'Amenities updated successfully...'}, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def updateFeatures(self,request):
        if request.session.get('username')is not None:
            if request.method == 'POST':
                if 'btn_updateFeatures' in request.POST:
                    prop_id=request.POST['prop_id']
                    features=request.POST.getlist('features')
                    d = datetime.now()
                    if(len(features)>0):
                        Property_Features.objects.filter(prop=prop_id).delete()
                        for index in range(0,len(features)):
                            if (features[index]) is not None:
                                featureDesc='NA'
                                if(features[index] == 'Any Household asset'):
                                    featureDesc=request.POST['other_assets']
                                try:
                                    insertData = Property_Features.objects.create(
                                        feature = features[index],
                                        feature_desc = featureDesc,
                                        prop = Property.objects.get(id=prop_id),
                                        date = d,
                                        added_by = request.session.get('username')
                                    )
                                except IntegrityError:
                                    pass
                        return JsonResponse({'success':'1','message':'Features updated successfully...'}, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def uploadPropImages(self,request):
        if request.session.get('username')is not None:
            if request.method == 'POST' or request.method == 'GET':
                if 'prop_id' in request.GET or 'prop_id' in request.POST:

                    if request.GET.get('prop_id'):
                        prop_id=request.GET['prop_id']
                    else:
                        prop_id=request.POST['prop_id']
                    
                    files = request.FILES.getlist('file')

                    image_type = ''
                    if request.POST.get('image_type'):
                        image_type = request.POST['image_type']

                    if not os.path.exists(self.get_image_path("property-images/"+prop_id,os.path.join(settings.MEDIA_ROOT,self.get_image_path("property-images/"+prop_id,'')))):
                        os.makedirs(self.get_image_path("property-images/"+prop_id,os.path.join(settings.MEDIA_ROOT, self.get_image_path("property-images/"+prop_id,''))))

                    for file_ in files:
                        file_url=""
                        fss=""
                        filename=""
                        try:
                            prop_img = file_
                            fss = FileSystemStorage(os.path.join(settings.MEDIA_ROOT,"property-images/"+prop_id))
                            filename=prop_img.name
                            file_url = "property-images/"+prop_id+"/"+filename
                        except MultiValueDictKeyError:
                            pass

                        d = datetime.now()
                        
                        if (file_url) is not None:
                            try:
                                insertData = Property_Images.objects.create(
                                    image_url = file_url,
                                    prop = Property.objects.get(id=prop_id),
                                    date = d,
                                    added_by = request.session.get('username'),
                                    image_type = image_type
                                )
                                if insertData:
                                    #save file after data stored
                                    try:
                                        fss.save(filename, prop_img)
                                    except MultiValueDictKeyError:
                                        pass
                            except IntegrityError:
                                pass
                        return JsonResponse({'success':'1','message':'Property Images updated successfully...',"image_id":Property_Images.objects.last().id,"image_url":Property_Images.objects.last().image_url}, status=status.HTTP_200_OK)
                else:
                    return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def updateThumbnail(self,request):
        if request.session.get('username')is not None:
            if request.method == 'POST' or request.method == 'GET':
                if 'prop_id' in request.POST:

                    image_id=request.POST['image_id']
                    old_image_url=request.POST['old_image_url']
                    prop_id=request.POST['prop_id']
                    files = request.FILES.getlist('file')
                    image_type = request.POST['image_type']

                    if not os.path.exists(self.get_image_path("property-images/"+prop_id,os.path.join(settings.MEDIA_ROOT,self.get_image_path("property-images/"+prop_id,'')))):
                        os.makedirs(self.get_image_path("property-images/"+prop_id,os.path.join(settings.MEDIA_ROOT, self.get_image_path("property-images/"+prop_id,''))))

                    for file_ in files:
                        file_url=""
                        fss=""
                        filename=""
                        try:
                            prop_img = file_
                            fss = FileSystemStorage(os.path.join(settings.MEDIA_ROOT,"property-images/"+prop_id))
                            filename=prop_img.name
                            file_url = "property-images/"+prop_id+"/"+filename
                        except MultiValueDictKeyError:
                            pass

                    if (file_url) is not None:
                        try: 
                            img = Property_Images.objects.get(pk=image_id) 
                            if img:
                                img.image_url = file_url
                                img.save(update_fields=['image_url'])
                                try:
                                    fss.save(filename, prop_img)
                                    if request.POST['old_image_url'] != '':
                                        if os.path.exists("media/"+request.POST['old_image_url']):
                                            os.remove("media/"+request.POST['old_image_url'])
                                except MultiValueDictKeyError:
                                    pass
                                return JsonResponse({'success':'1','message':'Property Images updated successfully...',"image_id":image_id,"image_url":file_url}, status=status.HTTP_200_OK)
                        except Property_Images.DoesNotExist: 
                            return JsonResponse({'success':'0','message': 'Image does not exists!!!'}, status=status.HTTP_404_NOT_FOUND)
                        return JsonResponse({'success':'1','message':'Property Images updated successfully...',"image_id":image_id,"image_url":file_url}, status=status.HTTP_200_OK)
                else:
                    return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def uploadFloorPlans(self,request):
        if request.session.get('username')is not None:
            if request.method == 'POST':
                if 'prop_id' in request.GET:
                    prop_id=request.GET['prop_id']
                    files = request.FILES.getlist('file')

                    if not os.path.exists(self.get_image_path("property-images/"+prop_id+"/floor-plan",os.path.join(settings.MEDIA_ROOT,self.get_image_path("property-images/"+prop_id+"/floor-plan",'')))):
                        os.makedirs(self.get_image_path("property-images/"+prop_id+"/floor-plan",os.path.join(settings.MEDIA_ROOT, self.get_image_path("property-images/"+prop_id+"/floor-plan",''))))

                    for file_ in files:
                        file_url=""
                        fss=""
                        filename=""
                        try:
                            prop_img = file_
                            fss = FileSystemStorage(os.path.join(settings.MEDIA_ROOT,"property-images/"+prop_id+"/floor-plan"))
                            filename=prop_img.name
                            file_url = "property-images/"+prop_id+"/floor-plan/"+filename
                        except MultiValueDictKeyError:
                            pass

                        d = datetime.now()
                        
                        if (file_url) is not None:
                            try:
                                insertData = Property_Floor_Plans.objects.create(
                                    image_url = file_url,
                                    prop = Property.objects.get(id=prop_id),
                                    date = d,
                                    added_by = request.session.get('username')
                                )
                                if insertData:
                                    #save file after data stored
                                    try:
                                        fss.save(filename, prop_img)
                                    except MultiValueDictKeyError:
                                        pass
                            except IntegrityError:
                                pass
                        return JsonResponse({'success':'1','message':'Floor Plan updated successfully...'}, status=status.HTTP_200_OK)
                else:
                    return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def uploadVideos(self,request):
        if request.session.get('username')is not None:
            if request.method == 'POST':
                if 'prop_id' in request.GET:
                    prop_id=request.GET['prop_id']
                    files = request.FILES.getlist('file')

                    if not os.path.exists(self.get_image_path("property-images/"+prop_id+"/videos",os.path.join(settings.MEDIA_ROOT,self.get_image_path("property-images/"+prop_id+"/videos",'')))):
                        os.makedirs(self.get_image_path("property-images/"+prop_id+"/videos",os.path.join(settings.MEDIA_ROOT, self.get_image_path("property-images/"+prop_id+"/videos",''))))

                    for file_ in files:
                        file_url=""
                        fss=""
                        filename=""
                        try:
                            prop_img = file_
                            fss = FileSystemStorage(os.path.join(settings.MEDIA_ROOT,"property-images/"+prop_id+"/videos"))
                            filename=prop_img.name
                            file_url = "property-images/"+prop_id+"/videos/"+filename
                        except MultiValueDictKeyError:
                            pass

                        d = datetime.now()
                        
                        if (file_url) is not None:
                            try:
                                insertData = Property_Videos.objects.create(
                                    video_url = file_url,
                                    prop = Property.objects.get(id=prop_id),
                                    date = d,
                                    added_by = request.session.get('username')
                                )
                                if insertData:
                                    #save file after data stored
                                    try:
                                        fss.save(filename, prop_img)
                                    except MultiValueDictKeyError:
                                        pass
                            except IntegrityError:
                                pass
                        return JsonResponse({'success':'1','message':'Videos updated successfully...'}, status=status.HTTP_200_OK)
                else:
                    return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def get_image_path(self,foldername,mediapath):
        return os.path.join(foldername, mediapath)

    def deletePropImage(self,request):
        if request.method == 'POST':
            if 'image_id' in request.POST:
                id=request.POST['image_id']
                image_url=request.POST['image_url']

                try: 
                    img = Property_Images.objects.get(pk=id) 
                except Property_Images.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Image does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
                if img.delete():
                    if os.path.exists("media/"+image_url):
                        os.remove("media/"+image_url) 
                return JsonResponse({'success':'1','message': 'Image deleted successfully...'}, status=status.HTTP_200_OK)

    def deleteFloorPlans(self,request):
        if request.method == 'POST':
            if 'image_id' in request.POST:
                id=request.POST['image_id']
                image_url=request.POST['image_url']

                try: 
                    img = Property_Floor_Plans.objects.get(pk=id) 
                except Property_Floor_Plans.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Image does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
                if img.delete():
                    if os.path.exists("media/"+image_url):
                        os.remove("media/"+image_url) 
                return JsonResponse({'success':'1','message': 'Image deleted successfully...'}, status=status.HTTP_200_OK)

    def deleteVideo(self,request):
        if request.method == 'POST':
            if 'video_id' in request.POST:
                id=request.POST['video_id']
                video_url=request.POST['video_url']

                try: 
                    img = Property_Videos.objects.get(pk=id) 
                except Property_Videos.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Video does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
                if img.delete():
                    if os.path.exists("media/"+video_url):
                        fp=open("media/"+video_url,"r")
                        fp.close() 
                        os.remove("media/"+video_url) 
                return JsonResponse({'success':'1','message': 'Video deleted successfully...'}, status=status.HTTP_200_OK)

    def deleteProperty(self,request):
        if request.method == 'POST':
            if 'property' in request.POST:
                id=request.POST['id']
                try: 
                    property = Property.objects.get(pk=id) 
                except Property.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Property does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 

                Property_Places.objects.filter(prop=id).delete()

                Property_Amenities.objects.filter(prop=id).delete()

                Property_Features.objects.filter(prop=id).delete()

                try: 
                    img = Property_Images.objects.all().filter(prop_id=id) 
                except Property_Images.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Image does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
                if len(img) > 0 :
                    for im in img:
                        if os.path.exists("media/"+im.image_url):
                            os.remove("media/"+im.image_url) 
                Property_Images.objects.filter(prop=id).delete()

                try: 
                    room = Property_Rooms.objects.all().filter(prop_id=id) 
                except Property_Rooms.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Room does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
                if len(room) > 0 :
                    for im in room:
                        if im.blue_print!='':
                            if os.path.exists("media/"+im.blue_print):
                                os.remove("media/"+im.blue_print) 
                        if im.threed_print!='':
                            if os.path.exists("media/"+im.threed_print):
                                os.remove("media/"+im.threed_print) 
                Property_Rooms.objects.filter(prop=id).delete()

                try: 
                    img1 = Property_Floor_Plans.objects.all().filter(prop_id=id) 
                except Property_Floor_Plans.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Image does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
                if len(img1) > 0 :
                    for im in img1:
                        if os.path.exists("media/"+im.image_url):
                            os.remove("media/"+im.image_url) 
                Property_Floor_Plans.objects.filter(prop=id).delete()

                try: 
                    img2 = Property_Videos.objects.all().filter(prop_id=id) 
                except Property_Videos.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Video does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
                if len(img2) > 0 :
                    for im in img2:
                        if os.path.exists("media/"+im.video_url):
                            os.remove("media/"+im.video_url) 
                Property_Videos.objects.filter(prop=id).delete()

                property.delete() 
                return JsonResponse({'success':'1','message': 'Property deleted successfully...'}, status=status.HTTP_200_OK)

class ReportCls:
    def webContactReport(self,request):
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            return render(request,'dashboard/web-contact-report.html')
        else:
            return HttpResponseRedirect('index')

    def webPropertyEnquiryReport(self,request):
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            return render(request,'dashboard/web-property-enquiry-report.html')
        else:
            return HttpResponseRedirect('index')

    def showWebContactEnquiries(self,request):
        if request.method == 'GET' or request.method == 'POST':
            
            all_enquiries=Contact_Enquiry.objects.all().filter(enquiry_status__exact='Pending')
            conditions={}

            from_date=''
            to_date=''
            if request.POST.get('from_date'):
                from_date=request.POST['from_date']
                to_date=request.POST['to_date']
                if from_date!='':
                    conditions['enquiry_date__date__gte']=from_date
                if to_date!='':
                    conditions['enquiry_date__date__lte']=to_date
            
            if(len(conditions)>0):
                all_enquiries=all_enquiries.filter(**conditions)

            all_enquiries=all_enquiries.order_by('-id')
                        
            data=[]
            sr_no=0
            
            for i in all_enquiries:
                sr_no+=1
                data.append({'sr_no':sr_no,'contact_id':i.id, 'enquiry_date':i.enquiry_date.strftime('%d-%m-%Y'), 'full_name':i.full_name, 'contact_number':i.contact_number, 'email':i.email,'message':i.message,'ip_address':i.ip_address})
            return JsonResponse(data, status=status.HTTP_200_OK,safe=False)

    def showWebPropertyEnquiries(self,request):
        if request.method == 'GET' or request.method == 'POST':
            
            all_enquiries=Property_Enquiry.objects.all().filter(enquiry_status__exact='Pending')
            conditions={}

            from_date=''
            to_date=''
            if request.POST.get('from_date'):
                from_date=request.POST['from_date']
                to_date=request.POST['to_date']
                if from_date!='':
                    conditions['enquiry_date__date__gte']=from_date
                if to_date!='':
                    conditions['enquiry_date__date__lte']=to_date
            
            if(len(conditions)>0):
                all_enquiries=all_enquiries.filter(**conditions)

            all_enquiries=all_enquiries.order_by('-id')
                        
            data=[]
            sr_no=0
            
            for i in all_enquiries:
                sr_no+=1
                data.append({'sr_no':sr_no,'prop_id':i.id, 'enquiry_date':i.enquiry_date.strftime('%d-%m-%Y'), 'full_name':i.full_name, 'contact_number':i.contact_number, 'email':i.email,'message':i.message,'ip_address':i.ip_address})
            return JsonResponse(data, status=status.HTTP_200_OK,safe=False)
            
class JobDescCls:
    def addJobDescriptionPage(self,request):
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            return render(request,'dashboard/add-job-description.html')
        else:
            return HttpResponseRedirect('index')
    
    def JobDescriptionPage(self,request):
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            return render(request,'dashboard/job-description.html')
        else:
            return HttpResponseRedirect('index')
    
    def JobApplicationReport(self,request):
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            return render(request,'dashboard/job-application-report.html')
        else:
            return HttpResponseRedirect('index')
        
    def showJobDescription(self,request):
        if request.method == 'GET':
            all_job_disc=job_description.objects.all().order_by('-id')
            data=[]
            sr_no=0
            for i in all_job_disc:
                sr_no+=1
                cls = 'primary'
                if i.job_status == 'Active':
                    cls = 'success'
                    icon = 'unlock'
                    stat = 'Active'
                else:
                    cls = 'danger'
                    icon = 'lock'
                    stat = 'Deactive'
                
                data.append({'sr_no':sr_no,'job_d_id':i.id, 'job_title':i.title,'job_description':i.description,'date':i.date,'job_status':stat,'cls':cls,'icon':icon,'unique_id':i.unique_id})
            return JsonResponse(data, status=status.HTTP_200_OK,safe=False) 
        
    def addJobDescription(self,request):
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            if request.method == 'POST':
                if 'btn_addjobDesc' in request.POST:

                    unique_id = Utility().random_string(3,5,9)
                    unique_id = unique_id+str(int(time.time()))

                    title = request.POST['job_title']
                    description = request.POST['job_description']
                    job_status = 'Active'
                    d = datetime.now()

                    if (title) is not None:
                        insertData = job_description.objects.create(
                            date = d,
                            title = title,
                            description = description,
                            job_status = job_status,
                            unique_id = unique_id
                        )
                    
                    return JsonResponse({'success':'1','message':'job added successfully...'}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def showJobApplication(self,request):
        if request.method == 'GET' or request.method == 'POST':
            
            all_application=job_applications.objects.all()
            conditions={}

            from_date=''
            to_date=''
            if request.POST.get('from_date'):
                from_date=request.POST['from_date']
                to_date=request.POST['to_date']
                if from_date!='':
                    conditions['date__date__gte']=from_date
                if to_date!='':
                    conditions['date__date__lte']=to_date
            
            if(len(conditions)>0):
                all_application=all_application.filter(**conditions)

            all_application=all_application.order_by('-id')
                        
            data=[]
            sr_no=0
            
            for i in all_application:
                sr_no+=1
                data.append({'sr_no':sr_no,'job_a_id':i.id,'job_title':i.job_desc.title,'job_description':i.job_desc.description,'name':i.name,'number':i.number,'email':i.email,'city':i.city,'document_file_url':i.document_file_url, 'application_date':i.date.strftime('%d-%m-%Y')})
            return JsonResponse(data, status=status.HTTP_200_OK,safe=False)
        
    def changeJobDescStatus(self,request):
        if request.method == 'POST':
            if 'changeJobDescStatus' in request.POST:
                id=request.POST['id']
                try: 
                    data = job_description.objects.get(pk=id) 
                except job_description.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'job description does not exists!!!'}, status=status.HTTP_404_NOT_FOUND)
                if data:
                    stat = ''
                    if data.job_status == 'Active':
                        stat = 'Deactive'
                    else:
                        stat = 'Active'
                    data.job_status=stat
                    data.save(update_fields=['job_status'])
                    return JsonResponse({'success':'1','message':'job description data updated successfully...'}, status=status.HTTP_200_OK)
            return HttpResponse('You are not allowed to send data')
        return HttpResponse('You are not allowed to send data')
    
    def deleteJobDesc(self,request):
        if request.method == 'POST':
            if 'deleteJobDesc' in request.POST:
                id=request.POST['id']
                try: 
                    jobDesc = job_description.objects.get(pk=id) 
                except job_description.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'Job Description does not exists!!!'}, status=status.HTTP_404_NOT_FOUND) 
                
                jobDesc.delete() 
                return JsonResponse({'success':'1','message': 'Job Description deleted successfully...'}, status=status.HTTP_200_OK)
             
    def updateJobDescPage(self,request):
        if request.session.get('username')is not None and (request.session.get('role') == 1 or request.session.get('role') == 2):
            id=request.GET['id']
            data = job_description.objects.get(id=id)
            return render(request,'dashboard/update-job-description.html',{'data':data})
        else:
            return HttpResponseRedirect('index')
        
    def updateJobDesc(self,request):
        if request.method == 'POST':
            if 'btn_updatejobDesc' in request.POST:
                id=request.POST['job_d_id']
                job_title = request.POST['job_title']
                job_description1 = request.POST['job_description']

                try: 
                    job = job_description.objects.get(pk=id) 
                    if job:
                        if (job_title) is not None:
                            job.title = job_title
                            job.description = job_description1

                            job.save(update_fields=['title','description'])

                            return JsonResponse({'success':'1','message':'job description data updated successfully...'}, status=status.HTTP_200_OK)
                        return JsonResponse({'success':'0','message':'Please check all the fields data properly!!!'}, status=status.HTTP_400_BAD_REQUEST)
                except job_description.DoesNotExist: 
                    return JsonResponse({'success':'0','message': 'job description does not exists!!!'}, status=status.HTTP_404_NOT_FOUND)
                except IntegrityError:
                    return JsonResponse({'success':'0','message':'Entered job description is already present. Add another!!!'}, status=status.HTTP_200_OK)
                return JsonResponse({'success':'0','message':'Something went wrong. Please try again later!!!'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            return HttpResponse('You are not allowed to send data!!!')

