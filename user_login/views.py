from genericpath import exists
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.utils.datastructures import MultiValueDictKeyError
from django.db.models import Q
from admin_panel.models import Employee
from admin_panel.views import EncryptionCls
from django.http.response import JsonResponse
from rest_framework import status
from datetime import datetime
from django.core.mail import EmailMessage
import random,re,os
from user_login.models import LoginReport,ForgotPassword

class LoginCls:
    def showLogin(self,request):
        self.logout(request)
        return render(request,'dashboard/login.html',{'error':''})
        
    def login(self,request):
        if request.method == 'POST':
            user = request.POST['username']
            pas = request.POST['password']
            if (user != None and pas != None):
                # login_success = Employee.objects.filter(emp_mob=user).filter(password=pas).filter(status='Active')
                login_success = Employee.objects.filter(emp_mob=user).filter(status='Active')
                if not login_success:
                    return JsonResponse({'success':'0','message':'Username or password is incorrect'}, status=status.HTTP_200_OK)
                else:
                    emp_id=login_success[0].id
                    db_pass=login_success[0].password.decode('unicode-escape').encode('ISO-8859-1')
                    salt=login_success[0].salt.decode('unicode-escape').encode('ISO-8859-1')
                    encrypt=EncryptionCls()
                    new_pass=encrypt.encryption(salt,pas)
                    # print("Salt :: ",salt)
                    # print("Salt :: ",type(salt))
                    # print("db pass :: ",db_pass)
                    # print("New Password :: ",new_pass)
                    if new_pass == db_pass:
                        request.session['username'] = login_success[0].emp_mob
                        request.session['role'] = login_success[0].role_id
                        request.session['emp_id'] = login_success[0].id
                        # request.session['password'] = login_success[0].password
                        # if request.session['password'] == pas and request.session['username'] == user:
                        if request.session['username'] == user:
                            # get ip address
                            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
                            if x_forwarded_for:
                                ipaddress = x_forwarded_for.split(',')[-1].strip()
                            else:
                                ipaddress = request.META.get('REMOTE_ADDR')
                            
                            d = datetime.now()
                            
                            try:
                                insertData = LoginReport.objects.create(
                                    username = user,
                                    login_date_time = d,
                                    ip_address = ipaddress,
                                    emp = Employee.objects.get(id=emp_id),
                                )
                                if insertData:
                                    return JsonResponse({'success':'1','message':'User logged in successfully...'}, status=status.HTTP_200_OK)
                                else:
                                    return JsonResponse({'success':'0','message':'Username or password is incorrect'}, status=status.HTTP_200_OK)
                            except:
                                return JsonResponse({'success':'0','message':'Username or password is incorrect'}, status=status.HTTP_200_OK)
                            # return HttpResponseRedirect('admin_panel')
                        else:
                            return JsonResponse({'success':'0','message':'Username or password is incorrect'}, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','message':'Username or password is incorrect'}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'success':'0','message':'Please check all fields data properly!!!'}, status=status.HTTP_200_OK)

    def logout(self,request):
        try:
            del request.session['username']
            # del request.session['password']
        except KeyError:
            pass
        if 'username' not in request.session.keys():
            return render(request,'dashboard/login.html')

    def showForgotPass(self,request):
        return render(request,'dashboard/forgot-password.html',{'error':''})

    def generate_otp(self,request):
        if request.method == 'POST':
            email = request.POST['email']
            pas = request.POST['con_pwd']
            otp = random.randint(100000,999999)

            if (email != None and pas != None):
                login_success = Employee.objects.filter(email=email).filter(status='Active')
                if not login_success:
                    return JsonResponse({'success':'0','message':'Username or password is incorrect'}, status=status.HTTP_200_OK)
                else:
                    d = datetime.now()
                    insertOTP = ForgotPassword.objects.create(
                        email = email,
                        otp = otp,
                        request_date = d,
                        # password = pas,
                    )
                    if(insertOTP):
                        request.session['forgot_email'] = login_success[0].email
                        request.session['forgot_pass'] = pas
                        mail_message='Dear Customer,<br/><br/>Please use the following OTP: '+str(otp)+' to complete your online request for account : '+email+'.<br/><br/>Never share your OTP, URN, CVV or passwords with anyone.<br/><br/>Property Stop Team<br/><strong>****This is a system-generated e-mail. Please do not reply to this e-mail****<strong>'
                        
                        # mail = EmailMessage('Property Stop: One Time Password', 'OTP for password change request : '+str(otp), to=['shalini7548@gmail.com'])
                        # mail = EmailMessage('Property Stop: One Time Password for Account : '+email, message, to=[email])
                        # mail.send()
                        
                        mail_subject='Property Stop: One Time Password for Account : '+email
                        # send_mail=SendMailCls()
                        # send_mail.sendMail(mail_message,mail_subject,email)
                        
                        return JsonResponse({'success':'1','data':'OTP Sent to '+email},status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','data':'Something went wrong. Please try again later'},status=status.HTTP_200_OK)
            else:
                return JsonResponse({'success':'0','data':'Please check all the fields data properly...'},status=status.HTTP_200_OK)
        return JsonResponse({'success':'0','data':'Something went wrong'},status=status.HTTP_200_OK)

    def verify_otp(self,request):
        if request.method == 'POST':
            pwd = request.POST['pwd']
            email = request.POST['otp_email']
            otp = request.POST['otp']
            # print(otp)
            if(otp!='' and re.match("^[0-9]*$", otp)):
                # print('inside if -----',otp)
                try:
                    verifyOTP = ForgotPassword.objects.filter(email__exact = request.session['forgot_email']).last()
                    if(verifyOTP):
                        if(verifyOTP.otp == otp):
                            salt = os.urandom(32)
                            encrypt=EncryptionCls()
                            new_pass=encrypt.encryption(salt,request.session['forgot_pass'])

                            new_salt = bytes(repr(salt)[2:-1],'ISO-8859-1')

                            emp = Employee.objects.get(email__exact = verifyOTP.email)
                            emp.password_text=request.session['forgot_pass']
                            emp.password = new_pass
                            emp.salt = new_salt
                            emp.save(update_fields=['password_text','password','salt'])
                            return JsonResponse({'success':'1','data':'Your password changed successfully'},status=status.HTTP_200_OK)
                        else:
                            return JsonResponse({'success':'0','data':'Incorrect OTP'},status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'success':'0','data':'Something went wrong. Please try again later'},status=status.HTTP_200_OK)
                except ForgotPassword.DoesNotExist:
                    return JsonResponse({'success':'0','data':'Incorrect OTP'},status=status.HTTP_200_OK)
            else:
                return JsonResponse({'success':'0','data':'Please check all the fields data properly...'},status=status.HTTP_200_OK)
        # return JsonResponse({'success':'0','data':'Something went wrong'},status=status.HTTP_200_OK)