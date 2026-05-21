from email import message
import email
import re
import os
import random   
from delta_yards import settings
from .models import job_applications
from django.core.files.storage import FileSystemStorage
from unicodedata import name
from django.http import Http404, HttpRequest, HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
import json as simplejson
from django.contrib.auth import authenticate
from rest_framework import status
from django.db.models import Aggregate,Count,CharField
from admin_panel.models import Property, Property_Images, Property_Amenities, Property_Features, Property_Places,Property_Floor_Plans,Property_Rooms, Property_Videos
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt

from website.models import Contact_Enquiry, Property_Enquiry
from admin_panel.models import job_description

class UtilityCls:
    def formatINR(self,number):
        s, *d = str(number).partition(".")
        r = ",".join([s[x-2:x] for x in range(-3, -len(s), -2)][::-1] + [s[-3:]])
        return "".join([r] + d)

    @staticmethod
    def resolve_media_image(image_url):
        if not image_url:
            return 'no_image-1.png'
        if image_url == 'no_image-1.png':
            return image_url
        full_path = os.path.join(settings.MEDIA_ROOT, image_url)
        if os.path.isfile(full_path):
            return image_url
        fallback = UtilityCls._find_property_folder_image(image_url)
        if fallback:
            return fallback
        return 'no_image-1.png'

    @staticmethod
    def _find_property_folder_image(image_url):
        parts = image_url.replace('\\', '/').split('/')
        if len(parts) < 2 or parts[0] != 'property-images' or not parts[1].isdigit():
            return None
        prop_dir = os.path.join(settings.MEDIA_ROOT, 'property-images', parts[1])
        if not os.path.isdir(prop_dir):
            return None
        for root, _dirs, files in os.walk(prop_dir):
            for name in sorted(files):
                if name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif')):
                    return os.path.relpath(
                        os.path.join(root, name), settings.MEDIA_ROOT
                    ).replace('\\', '/')
        return None

class PropertyCls:
    def home_featured_prop(self,request,filter_prop):
        if filter_prop=='featured_property':
            all_property = Property.objects.all().filter(property_status='Active').filter(featured_property='Yes')
        else:
            all_property = Property.objects.all().filter(property_status='Active')

        data = []
        d = {}
        sr_no=1
        for i in all_property:
            d = {'sr_no':sr_no,'id':i.id,'prop_about':i.prop_about,'project_name':i.project_name,'prop_type':i.prop_type,'prop_address':i.prop_address,'prop_city':i.prop_city,'prop_state':i.prop_state,'prop_country':i.prop_country,'build_floors':i.build_floors,'build_wings':i.build_wings,'builder_name':i.builder_name,'possesssion_date':i.possesssion_date,'build_status_ready':i.build_status_ready,'unique_id':i.unique_id}
            try:
                # prop_img = Property_Images.objects.filter(prop_id__exact = i.id).values('image_url').first()
                # if(prop_img is not None):
                #         d['prop_img']=prop_img['image_url']
                # else:
                #     d['prop_img']='no_image-1.png'
                prop_img = Property_Images.objects.filter(prop_id__exact = i.id).filter(image_type__exact='Thumbnail').values('image_url')

                # print(prop_img[0]['image_url'])

                if(prop_img is not None and len(prop_img)>0):
                    d['prop_img']=UtilityCls.resolve_media_image(prop_img[0]['image_url'])
                else:
                    d['prop_img']='no_image-1.png'
                # data.append(d)
            except Property_Images.DoesNotExist:
                d['prop_img']='no_image-1.png'
                # data.append(d)

            # f1 = Property_Rooms.objects.values('prop_id').filter(prop_id=i.id).annotate(count=Count('prop_id'), prop_rooms=GroupConcat('prop_rooms', separator=' | '))
            f1 = Property_Rooms.objects.filter(prop_id=i.id).values('prop_rooms','prop_price')
            print('-------------------------------',f1)
            prop_rooms = ''
            if len(f1)>0:
                print('------------------------------------',f1[0]['prop_rooms'])
                prop_rooms = f1[0]['prop_rooms']
                prop_price = f1[0]['prop_price']
            d['prop_rooms']=prop_rooms
            d['prop_price']=UtilityCls().formatINR(prop_price)

            f2 = Property_Images.objects.filter(prop_id__exact = i.id).exclude(image_type__exact='Thumbnail').values('image_url')

            # print(f2)
            prop_imgs=[]

            if len(f2)>0:
                for img in f2:
                    resolved = UtilityCls.resolve_media_image(img["image_url"])
                    if resolved != 'no_image-1.png' or len(prop_imgs) == 0:
                        prop_imgs.append(resolved)

            d['prop_imgs']=prop_imgs

            if request.session.get('user_logged_status') is not None:
                d['download_cls']=''
                d['download_brochure']='media/'+i.brochure
                d['download_parameter']='download'
            else:
                d['download_cls']='log-modal'
                d['download_brochure']='#'
                d['download_parameter']=''

            data.append(d)

            sr_no+=1
        return data

class WebEnquiriesCls:
    def contact_enquiry(self,request):
        if request.method == 'POST':
            if 'btn_contact' in request.POST:
                field = request.POST['field']
                full_name = request.POST['name']
                contact_number = request.POST['contact_no']
                email = request.POST['email']
                message = request.POST['message']
                email_regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
                flag=False
                if field=='':
                    if full_name!='' and contact_number!='' and email!='' and message!='':
                        if re.match("^[a-z A-Z]*$", full_name) and re.match("^[0-9]*$", contact_number) and re.fullmatch(email_regex, email):
                            if message!='':
                                if len(message)<=200 and len(message)>=20 and re.match("^[a-zA-Z0-9-.,/ ]*$", message):
                                    flag=True
                                else:
                                    flag=False
                                    return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
                            else:
                                flag=True    

                            if flag==True:
                                d = datetime.now()
                                # get ip address
                                x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
                                if x_forwarded_for:
                                    ipaddress = x_forwarded_for.split(',')[-1].strip()
                                else:
                                    ipaddress = request.META.get('REMOTE_ADDR')
                                try:
                                    insertData = Contact_Enquiry.objects.create(
                                        full_name = full_name,
                                        email = email,
                                        contact_number = contact_number,
                                        message = message,
                                        enquiry_date = d,
                                        ip_address=ipaddress
                                    )
                                    if insertData:
                                        return JsonResponse({'success':'1','message':'Thank You. Your request submitted successfully. We will respond to your request shortly...'}, status=status.HTTP_200_OK)
                                    else:
                                        return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
                                except:
                                    return JsonResponse({'success':'0','message':'Something went wrong. Please try again!!!'}, status=status.HTTP_200_OK)
                        else:
                            return JsonResponse({'success':'0','message':'Please check all fields data properly...'}, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','message':'Please fill all the mandatory fields...'}, status=status.HTTP_200_OK) 
                else:
                    return JsonResponse({'success':'0','message':'Please check all fields data properly...'}, status=status.HTTP_200_OK) 
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def property_enquiry(self,request):
        if request.method == 'POST':
            if 'btn_enquiry' in request.POST:
                field = request.POST['field']
                full_name = request.POST['name']
                contact_number = request.POST['contact_no']
                email = request.POST['email']
                message = request.POST['message']
                email_regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
                flag=False
                if field=='':
                    if full_name!='' and contact_number!='' and email!='' and message!='':
                        if re.match("^[a-z A-Z]*$", full_name) and re.match("^[0-9]*$", contact_number) and re.fullmatch(email_regex, email):
                            if message!='':
                                if len(message)<=200 and len(message)>=20 and re.match("^[a-zA-Z0-9-.,/ ]*$", message):
                                    flag=True
                                else:
                                    flag=False
                                    return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
                            else:
                                flag=True    

                            if flag==True:
                                d = datetime.now()
                                # get ip address
                                x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
                                if x_forwarded_for:
                                    ipaddress = x_forwarded_for.split(',')[-1].strip()
                                else:
                                    ipaddress = request.META.get('REMOTE_ADDR')
                                try:
                                    insertData = Property_Enquiry.objects.create(
                                        full_name = full_name,
                                        email = email,
                                        contact_number = contact_number,
                                        message = message,
                                        enquiry_date = d,
                                        ip_address=ipaddress
                                    )
                                    if insertData:
                                        return JsonResponse({'success':'1','message':'Thank You. Your request submitted successfully. We will respond to your request shortly...'}, status=status.HTTP_200_OK)
                                    else:
                                        return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
                                except:
                                    return JsonResponse({'success':'0','message':'Something went wrong. Please try again!!!'}, status=status.HTTP_200_OK)
                        else:
                            return JsonResponse({'success':'0','message':'Please check all fields data properly...'}, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','message':'Please fill all the mandatory fields...'}, status=status.HTTP_200_OK) 
                else:
                    return JsonResponse({'success':'0','message':'Please check all fields data properly...'}, status=status.HTTP_200_OK) 
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

def home(request):
    if request.method == 'GET':
        obj=PropertyCls()
        data=obj.home_featured_prop(request,'featured_property')
        # print(data)
        return render(request,'frontend/index.html',{'featured_prop':data})

def about(request):
    return render(request,'frontend/about.html')

def contact(request):
    return render(request,'frontend/contact.html')

def privacy_policy(request):
    return render(request,'frontend/privacy-policy.html')

def property_listing(request):
    obj=PropertyCls()
    data=obj.home_featured_prop(request,'property_listing')
    return render(request,'frontend/property-listing.html',{'featured_prop':data})

def single(request):
    if request.method == 'GET':
        prop_id = request.GET.get('id')
        if not prop_id:
            raise Http404

        property_obj = Property.objects.filter(unique_id=prop_id, property_status='Active').first()
        if not property_obj:
            raise Http404

        rooms = Property_Rooms.objects.filter(prop_id=property_obj.id).order_by('id')
        primary_room = rooms.first()
        if not primary_room:
            raise Http404

        property_feature = Property_Features.objects.filter(prop_id=property_obj.id)
        prop_images = Property_Images.objects.filter(prop_id=property_obj.id)

        vid = {}
        prop_video = Property_Videos.objects.filter(prop_id=property_obj.id).first()
        if prop_video:
            vid = {'video_url': prop_video.video_url}

        room_options = [
            {
                'prop_rooms': room.prop_rooms,
                'prop_carpet_area': room.prop_carpet_area,
                'prop_price': UtilityCls().formatINR(room.prop_price),
            }
            for room in rooms
        ]

        prop = {
            'project_name': property_obj.project_name,
            'prop_type': property_obj.prop_type,
            'prop_about': property_obj.prop_about,
            'prop_address': property_obj.prop_address,
            'prop_price': UtilityCls().formatINR(primary_room.prop_price),
            'prop_rooms': primary_room.prop_rooms,
            'prop_carpet_area': primary_room.prop_carpet_area,
        }
        feature = [{'feature': f.feature} for f in property_feature]
        images = [
            {'img': UtilityCls.resolve_media_image(img.image_url)}
            for img in prop_images
        ]
        return render(
            request,
            'frontend/property-details.html',
            {'prop': prop, 'rooms': room_options, 'feature': feature, 'img': images, 'video': vid},
        )

def services(request):
    return render(request,'frontend/services.html')

def news(request):
    return render(request,'frontend/news.html')

def delta_yards_corner(request):
    return render(request,'frontend/news.html')

def certificate(request):
    return render(request,'frontend/certificate.html')

def hotdeals(request):
    return render(request,'frontend/hotdeals.html')


#Demo For Jquery Students
@csrf_exempt
def contact_info(request):
    if request.method == 'POST':
        if 'btn_contact' in request.POST:
            field = request.POST['field']
            full_name = request.POST['name']
            contact_number = request.POST['contact_no']
            email = request.POST['email']
            message = request.POST['message']
            email_regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
            flag=False
            if field=='':
                if full_name!='' and contact_number!='' and email!='' and message!='':
                    if re.match("^[a-z A-Z]*$", full_name) and re.match("^[0-9]*$", contact_number) and re.fullmatch(email_regex, email):
                        return JsonResponse({'success':'1','message':'Thank You. Your request submitted successfully. We will respond to your request shortly...'}, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','message':'Please check all fields data properly...'}, status=status.HTTP_200_OK)
                else:
                    return JsonResponse({'success':'0','message':'Please fill all the mandatory fields...'}, status=status.HTTP_200_OK) 
            else:
                return JsonResponse({'success':'0','message':'Please check all fields data properly...'}, status=status.HTTP_200_OK) 

#Demo For Jquery Students
def contact_demo(request):
    return render(request,'frontend/contact-demo.html')
    
class CareerCls:
    def job_desc(self,request):
        
        all_jobs = job_description.objects.filter(job_status='Active').order_by('-id')

        data = []
        d = {}
        sr_no=1
        for i in all_jobs:
            d = {'sr_no':sr_no,'job_title':i.title,'unique_id':i.unique_id}

            data.append(d)

            sr_no+=1
        return data

class JobApplyCls:
    
    def job_apply(self,request):
        if request.method == 'POST':
            if 'btn_apply' in request.POST:
                field = request.POST['field']
                unique_id = request.POST['JD_id']
                job_desc = job_description.objects.filter(unique_id = unique_id).get()
                name = request.POST['name']
                number = request.POST['number']
                email = request.POST['email']
                city = request.POST['city']
                document_file = request.FILES['pdf_file']
                email_regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
                
                if field=='':
                    if name!='' and number!='' and email!='' and city!='' and document_file!='':
                        if re.match("^[a-z A-Z]*$", name) and re.match("^[0-9]*$", number) and re.fullmatch(email_regex, email) and re.match("^[a-z A-Z]*$", city):

                            if not os.path.exists(self.get_image_path("job_application_files/"+str(job_desc.id)+"/doc",os.path.join(settings.MEDIA_ROOT,self.get_image_path("job_application_files/"+str(job_desc.id)+"/doc",'')))):
                                os.makedirs(self.get_image_path("job_application_files/"+str(job_desc.id)+"/doc",os.path.join(settings.MEDIA_ROOT, self.get_image_path("job_application_files/"+str(job_desc.id)+"/doc",''))))

                            if document_file.size > settings.MAX_RESUME_SIZE:
                                return JsonResponse({'success':'0','message':'File size exceeds the limit.'}, status=status.HTTP_200_OK)
                            # Validate file type
                            if not document_file.name.endswith('.pdf'):
                                return JsonResponse({'success':'0','message':'Only PDF files are allowed.'}, status=status.HTTP_200_OK)
                            
                            fss = FileSystemStorage(os.path.join(settings.MEDIA_ROOT,"job_application_files/"+str(job_desc.id)+"/doc"))
                            doc_name='document_'+str(random.randint(100000,999999))+'.pdf'
                            document_file_url = "job_application_files/"+str(job_desc.id)+"/doc"+"/"+doc_name
                            fss.save(doc_name, document_file)

                            d = datetime.now()
                            # get ip address
                            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
                            if x_forwarded_for:
                                ipaddress = x_forwarded_for.split(',')[-1].strip()
                            else:
                                ipaddress = request.META.get('REMOTE_ADDR')
                            try:
                                insertData = job_applications.objects.create(
                                    name = name,
                                    email = email,
                                    number = number,
                                    job_desc = job_desc,
                                    document_file_url = document_file_url,
                                    date = d,
                                    ip_address=ipaddress,
                                    city = city
                                )
                                if insertData:
                                    return JsonResponse({'success':'1','message':'Thank You, Your Application submitted successfully.'}, status=status.HTTP_200_OK)
                                else:
                                    return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)
                            except:
                                return JsonResponse({'success':'0','message':'Something went wrong. Please try again!!!'}, status=status.HTTP_200_OK)
                        else:
                            return JsonResponse({'success':'0','message':'Please check all fields data properly...'}, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','message':'Please fill all the mandatory fields...'}, status=status.HTTP_200_OK) 
                else:
                    return JsonResponse({'success':'0','message':'Please check all fields data properly...'}, status=status.HTTP_200_OK) 
            return HttpResponse("You are not allowed to view the content of this page!!!")
        else:
            HttpResponse('You are not allowed to send data!!!')

    def get_image_path(self,foldername,mediapath):
        return os.path.join(foldername, mediapath)

def career(request):
    obj=CareerCls()
    data=obj.job_desc(request)
    return render(request,'frontend/career.html',{'job_desc':data})

def job_details(request):
    id = request.GET['id']
    job_desc = job_description.objects.filter(unique_id = id).get()
    data = {'job_title':job_desc.title,'job_description':job_desc.description,'unique_id':job_desc.unique_id}
    return render(request,'frontend/job-details.html',{'job_desc':data})
