$(document).ready(function()
{
    $("#btn_login").click(function(e) 
    {
        $('#frm_login').validate({
            rules:
            {
                username:
                {
                    required:true,
                    maxlength:10,
                    minlength:10,
                    digits:true
                }
            },
            messages:
            {
                username:
                {
                    required:"Please enter mobile number",
                    maxlength:"Invalid mobile number",
                    minlength:"Invalid mobile number",
                    digits:"Invalid mobile number"
                }
            },
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"auth-user",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            window.location.assign("admin_panel");
                            var validator = $("#frm_login").validate();
                            validator.resetForm();
                        }
                        else if(response.success==0)
                        {
                            swal({title:"Error",text:response.message,type:"error"});
                        }
                    },
                    error: function() {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
        })
    });
    // $("#btn_forgotpass").click(function(e) 
    // {
    //     $('#frm_forgotpass').validate({
    //         rules:
    //         {
    //             forget_email:
    //             {
    //                 required:true,
    //                 email:true
    //             }
    //         },
    //         messages:
    //         {
    //             forget_email:
    //             {
    //                 required:"Please enter your email",
    //                 digits:"Invalid email"
    //             }
    //         },
    //         submitHandler: function(form) {
    //             $('#loading-modal').modal('show');
    //             $(form).ajaxSubmit({
    //                 type:"POST",
    //                 data: $(form).serialize(),
    //                 url:"auth-user",
    //                 success: function(response) {
    //                     $("#loading-modal").modal('hide');
    //                     if(response.success==1)
    //                     {
    //                         swal({title:"Success",text:response.message,type:"success"});
    //                         var validator = $("#frm_forgotpass").validate();
    //                         validator.resetForm();
    //                     }
    //                     else if(response.success==0)
    //                     {
    //                         swal({title:"Error",text:response.message,type:"error"});
    //                     }
    //                 },
    //                 error: function() {
    //                     $("#loading-modal").modal('hide');
    //                     swal({title:"Error",text:"Error Sending Request!",type:"error"});
    //                 }
    //             })
    //         }
    //     })
    // });
    $("#btn_forgotpass").click(function(e) 
    {
        var email = $('#forget_email').val();
        if(email !='')
        {
            $('#email').val(email);
            $('#resetPass-modal').modal('show');
        }
        else
        {
            swal({title:"Error",text:'Email id can not be blank',type:"error"});
        }
    });
    $("#btn_resetpass").click(function(e) 
    {
        $('#frm_resetpass').validate({
            rules:
            {
                new_pwd:
                {
                    required:true,
                },
                con_pwd:
                {
                    required:true,
                    equalTo:"#new_pwd"
                }
            },
            messages:
            {
                new_pwd:
                {
                    required:"Password cannot be blank",
                    
                },
                con_pwd:
                {
                    required:"Confirm password cannot be blank",
                    equalTo: "Password does not match"
                }
            },
            submitHandler: function(form) {
                if($('#new_pwd').val() == $('#con_pwd').val())
                {
                    $('#loading-modal').modal('show');
                    $(form).ajaxSubmit({
                        type:"POST",
                        data: $(form).serialize(),
                        url:"generate_otp",
                        success: function(response) {
                            $("#loading-modal").modal('hide');
                            if(response.success=='1')
                            {
                                swal({title:"Success",text:response.data,type:"success"});
                                $("#resetPass-modal").modal('hide');
                                $('#otp_email').val($('#email').val());
                                $('#pwd').val($('#con_pwd').val());
                                $("#verifyOTP-modal").modal('show');
                            }
                            else if(response.success=='0')
                            {
                                swal({title:"Error",text:response.data,type:"error"});
                            }
                        },
                        error: function() {
                            $("#loading-modal").modal('hide');
                            swal({title:"Error",text:"Error Sending Request!",type:"error"});
                        }
                    })
                }
                else{
                    swal({title:"Error",text:'Actual and Confirm password does not match',type:"error"});
                }
            }
        })
    });
    $("#btn_verifyOTP").click(function(e) 
    {
        $('#frm_verifyOTP').validate({
            rules:
            {
                otp:
                {
                    required:true,
                    digits:true
                }
            },
            messages:
            {
                otp:
                {
                    required:"OTP cannot be blank",
                    
                }
            },
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"verify_otp",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success=='1')
                        {
                            $("#forget_email").val('')
                            $("#verifyOTP-modal").modal('hide');
                            swal({title:"Success",text:response.data,type:"success"});
                        }
                        else if(response.success=='0')
                        {
                            swal({title:"Error",text:response.data,type:"error"});
                        }
                    },
                    error: function() {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
            
        })
    });
});