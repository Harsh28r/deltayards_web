$(document).ready(function()
{
    $("#btn_addNotification").click(function(e) 
    {
        $('#frm_addNotification').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"addNotification",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            $.toast({
                                heading: 'Success',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                            angular.element(document.getElementById('NotificationController')).scope().show();
                            var validator = $("#frm_addNotification").validate();
                            validator.resetForm();
                        }
                        if(response.success==0)
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
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
    $("#btn_updateNotification").click(function(e) 
    {
        $('#frm_updateNotification').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"updateNotification",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            var validator = $("#frm_updateNotification").validate();
                            validator.resetForm();
                            $('#edit-modal').modal('hide');
                            $.toast({
                                heading: 'Success',
                                text: response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                        }
                        else
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
                        }
                        angular.element(document.getElementById('NotificationController')).scope().show();
                    },
                    error: function() {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
        })
    });
    $(document).on('click','.deleteNotification', function(e)
    {
        e.preventDefault();
        var uid = this.id;
        swal({   
            title: "Are you sure?",   
            text: "You want to delete this notification",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, function(){ 
            swal.close();
            $('#loading-modal').modal('show');
            $.ajax({
                url: 'deleteNotification',
                type: 'POST',
                data:{
                    notification:'notification',
                    id:uid,
                    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                }
            })
            .done(function(response){
                $("#loading-modal").modal('hide');
                if(response.success==1)
                {
                    $.toast({
                        heading: 'Success',
                        text: response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 3500,
                        stack: 6
                    });
                }
                else
                {
                    $.toast({
                        heading: 'Error',
                        text:response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'error',
                        hideAfter: 3500
                    });
                }
                angular.element(document.getElementById('NotificationController')).scope().show();
            })
            .fail(function(){
                $("#loading-modal").modal('hide');
                swal({title:"Error",text:"Error Sending Request!",type:"error"});
            });
        });
    });
    $("#btn_addBank").click(function(e) 
    {
        $('#frm_addBank').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"addBank",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            $.toast({
                                heading: 'Success',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                            angular.element(document.getElementById('BankController')).scope().show();
                            var validator = $( "#frm_addBank" ).validate();
                            validator.resetForm();
                        }
                        if(response.success==0)
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
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
    $("#btn_updateBank").click(function(e) 
    {
        $('#frm_updateBank').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"updateBank",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            var validator = $("#frm_updateBank").validate();
                            validator.resetForm();
                            $('#edit-modal').modal('hide');
                            $.toast({
                                heading: 'Success',
                                text: response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                        }
                        else
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
                        }
                        angular.element(document.getElementById('BankController')).scope().show();
                    },
                    error: function() {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
        })
    });
    $(document).on('click','.deleteBank', function(e)
    {
        e.preventDefault();
        var uid = this.id;
        swal({   
            title: "Are you sure?",   
            text: "You want to delete this bank",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, function(){ 
            swal.close();
            $('#loading-modal').modal('show');
            $.ajax({
                url: 'deleteBank',
                type: 'POST',
                data:{
                    bank:'bank',
                    id:uid,
                    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                }
            })
            .done(function(response){
                $("#loading-modal").modal('hide');
                if(response.success==1)
                {
                    $.toast({
                        heading: 'Success',
                        text: response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 3500,
                        stack: 6
                    });
                }
                else
                {
                    $.toast({
                        heading: 'Error',
                        text:response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'error',
                        hideAfter: 3500
                    });
                }
                angular.element(document.getElementById('BankController')).scope().show();
            })
            .fail(function(){
                $("#loading-modal").modal('hide');
                swal({title:"Error",text:"Error Sending Request!",type:"error"});
            });
        });
    });
    $("#btn_addEmployee").click(function(e) 
    {
        $('#frm_addEmployee').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"addEmployee",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            $.toast({
                                heading: 'Success',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                            angular.element(document.getElementById('EmployeeController')).scope().show();
                            var validator = $( "#frm_addEmployee" ).validate();
                            validator.resetForm();
                        }
                        if(response.success==0)
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
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
    $("#btn_updateEmployee").click(function(e) 
    {
        $('#frm_updateEmployee').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"updateEmployee",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            var validator = $("#frm_updateEmployee").validate();
                            validator.resetForm();
                            $('#edit-modal').modal('hide');
                            $.toast({
                                heading: 'Success',
                                text: response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                        }
                        else
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
                        }
                        angular.element(document.getElementById('EmployeeController')).scope().show();
                    },
                    error: function() {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
        })
    });
    $(document).on('click','.deleteEmployee', function(e)
    {
        e.preventDefault();
        var uid = this.id;
        swal({   
            title: "Are you sure?",   
            text: "You want to delete this employee",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, function(){ 
            swal.close();
            $('#loading-modal').modal('show');
            $.ajax({
                url: 'deleteEmployee',
                type: 'POST',
                data:{
                    employee:'employee',
                    id:uid,
                    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                }
            })
            .done(function(response){
                $("#loading-modal").modal('hide');
                if(response.success==1)
                {
                    $.toast({
                        heading: 'Success',
                        text: response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 3500,
                        stack: 6
                    });
                }
                else
                {
                    $.toast({
                        heading: 'Error',
                        text:response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'error',
                        hideAfter: 3500
                    });
                }
                angular.element(document.getElementById('EmployeeController')).scope().show();
            })
            .fail(function(){
                $("#loading-modal").modal('hide');
                swal({title:"Error",text:"Error Sending Request!",type:"error"});
            });
        });
    });
    $("#btn_changeEmpPass").click(function(e) {
        $('#frm_changeEmpPass').validate({
            rules: {
                act_pass: {
                    required: true
                },
                emp_pass: {
                    required: true,
                    equalTo : "#act_pass"
                }
            },
            messages: {
                act_pass: {
                    required: "Please enter your new password"
                },
                emp_pass: {
                    required: "Please confirm your password",
                    equalTo: "Password does not match"
                }
            },
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"changeEmployeePass",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            var validator = $("#frm_changeEmpPass").validate();
                            validator.resetForm();
                            $('#change-modal').modal('hide');
                            $.toast({
                                heading: 'Success',
                                text: response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                        }
                        else
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
                        }
                        angular.element(document.getElementById('EmployeeController')).scope().show();	
                    },
                    error: function(response) {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
        })
    });
    $("#btn_addProperty").click(function(e) 
    {
        $('#frm_addProperty').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"addProperty",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            $.toast({
                                heading: 'Success',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                            window.location.assign("update-property?id="+response.prop_id);
                            var validator = $("#frm_addProperty").validate();
                            validator.resetForm();
                            $('.ready_cont').remove();
                            $('.under_cont').remove();
                        }
                        if(response.success==0)
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
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
    $("#btn_updateProperty").click(function(e) 
    {
        $('#frm_updateProperty').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"updateProperty",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            $.toast({
                                heading: 'Success',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                        }
                        if(response.success==0)
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
                        }
                    },
                    error: function() 
                    {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
        })
    });
    $("#btn_roomConfiguration").click(function(e) 
    {
        $('#frm_roomConfiguration').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"updateRoomConfig",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            $.toast({
                                heading: 'Success',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                            var validator = $("#frm_roomConfiguration").validate();
                            validator.resetForm();
                            $(".dynamic_config").html('');
                            showRooms();
                        }
                        if(response.success==0)
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
                        }
                    },
                    error: function() 
                    {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
        })
    });
    $(document).on('click','.updateRoom', function(e)
    {
        e.preventDefault();
        var uid = this.id;
        Swal.fire({
			title: "Are you sure?",
			text: "You want to update this configuration",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, update it!'
		}).then((result) => {
			if (result.isConfirmed) 
			{
                swal.close();
                $('#loading-modal').modal('show');
                // alert(document.getElementById('blue_print_'+uid).files[0])
                var formData = new FormData();
                formData.append('room_config','room_config');
                formData.append('room_id',uid);
                formData.append('csrfmiddlewaretoken',$('input[name=csrfmiddlewaretoken]').val());
                formData.append('prop_id',$('#prop_id').val());
                formData.append('prop_rooms',$('#prop_rooms_'+uid).val());
                formData.append('prop_carpet_area',$('#prop_carpet_area_'+uid).val());
                formData.append('prop_price',$('#prop_price_'+uid).val());
                formData.append('blue_print', $('#blue_print_'+uid)[0].files[0]);
                formData.append('threed_print', $('#threed_print_'+uid)[0].files[0]);
                formData.append('old_blue_print', $('#old_blue_print_'+uid).val());
                formData.append('old_threed_print', $('#old_threed_print_'+uid).val());

                $.ajax({
                    url: 'updateRoom',
                    type: 'POST',
                    data : formData,
                    processData: false,
                    contentType: false,
                })
                .done(function(response){
                    $("#loading-modal").modal('hide');
                    if(response.success==1)
                    {
                        $.toast({
                            heading: 'Success',
                            text: response.message,
                            position: 'top-right',
                            loaderBg: '#ff6849',
                            icon: 'success',
                            hideAfter: 3500,
                            stack: 6
                        });
                        showRooms();
                    }
                    else
                    {
                        $.toast({
                            heading: 'Error',
                            text:response.message,
                            position: 'top-right',
                            loaderBg: '#ff6849',
                            icon: 'error',
                            hideAfter: 3500
                        });
                    }
                })
                .fail(function(){
                    $("#loading-modal").modal('hide');
                    Swal.fire('Error!','Error Sending Request!','error');
                });
			}
		})
    });
    $(document).on('click','.deleteRoom', function(e)
    {
        e.preventDefault();
        var uid = this.id;
        Swal.fire({
			title: "Are you sure?",
			text: "You want to delete this configuration",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) 
			{
                swal.close();
                $('#loading-modal').modal('show');
                $.ajax({
                    url: 'deleteRoom',
                    type: 'POST',
                    data:{
                        room_config:'room_config',
                        id:uid,
                        csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                    }
                })
                .done(function(response){
                    $("#loading-modal").modal('hide');
                    if(response.success==1)
                    {
                        $.toast({
                            heading: 'Success',
                            text: response.message,
                            position: 'top-right',
                            loaderBg: '#ff6849',
                            icon: 'success',
                            hideAfter: 3500,
                            stack: 6
                        });
                        showRooms();
                    }
                    else
                    {
                        $.toast({
                            heading: 'Error',
                            text:response.message,
                            position: 'top-right',
                            loaderBg: '#ff6849',
                            icon: 'error',
                            hideAfter: 3500
                        });
                    }
                })
                .fail(function(){
                    $("#loading-modal").modal('hide');
                    Swal.fire('Error!','Error Sending Request!','error');
                });
			}
		})
    });
    $("#btn_updatePlaces").click(function(e) 
    {
        $('#frm_updatePlaces').validate({
            submitHandler: function(form) {
                if($('.cb_places:checkbox:checked').length == 0)
                {
                    $.toast({
                        heading: 'Error',
                        text:"Kindly select at least one place",
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'info',
                        hideAfter: 3500
                    });
                }
                else
                {
                    flag=false;
                    $.each($("input[name='near_by_places_text']"), function() {
                        if($(this).val()=="")
                        {
                            flag=true;
                        }
                    });
                    if(flag==true)
                    {
                        $.toast({
                            heading: 'Error',
                            text:"Kindly write the description for all the selected places",
                            position: 'top-right',
                            loaderBg: '#ff6849',
                            icon: 'info',
                            hideAfter: 3500
                        });
                    }
                    else
                    {
                        $('#loading-modal').modal('show');
                        $(form).ajaxSubmit({
                            type:"POST",
                            data: $(form).serialize(),
                            url:"updatePlaces",
                            success: function(response) {
                                $("#loading-modal").modal('hide');
                                if(response.success==1)
                                {
                                    $.toast({
                                        heading: 'Success',
                                        text:response.message,
                                        position: 'top-right',
                                        loaderBg: '#ff6849',
                                        icon: 'success',
                                        hideAfter: 3500,
                                        stack: 6
                                    });
                                }
                                if(response.success==0)
                                {
                                    $.toast({
                                        heading: 'Error',
                                        text:response.message,
                                        position: 'top-right',
                                        loaderBg: '#ff6849',
                                        icon: 'error',
                                        hideAfter: 3500
                                    });
                                }
                            },
                            error: function() 
                            {
                                $("#loading-modal").modal('hide');
                                swal({title:"Error",text:"Error Sending Request!",type:"error"});
                            }
                        })
                    }
                }
            }
        })
    });
    $("#btn_updateAmenities").click(function(e) 
    {
        $('#frm_updateAmenities').validate({
            submitHandler: function(form) {
                if($('.cb_amenities:checkbox:checked').length == 0)
                {
                    $.toast({
                        heading: 'Error',
                        text:"Kindly select at least one amenity",
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'info',
                        hideAfter: 3500
                    });
                }
                else
                {
                    $('#loading-modal').modal('show');
                    $(form).ajaxSubmit({
                        type:"POST",
                        data: $(form).serialize(),
                        url:"updateAmenities",
                        success: function(response) {
                            $("#loading-modal").modal('hide');
                            if(response.success==1)
                            {
                                $.toast({
                                    heading: 'Success',
                                    text:response.message,
                                    position: 'top-right',
                                    loaderBg: '#ff6849',
                                    icon: 'success',
                                    hideAfter: 3500,
                                    stack: 6
                                });
                            }
                            if(response.success==0)
                            {
                                $.toast({
                                    heading: 'Error',
                                    text:response.message,
                                    position: 'top-right',
                                    loaderBg: '#ff6849',
                                    icon: 'error',
                                    hideAfter: 3500
                                });
                            }
                        },
                        error: function() 
                        {
                            $("#loading-modal").modal('hide');
                            swal({title:"Error",text:"Error Sending Request!",type:"error"});
                        }
                    })
                }
            }
        })
    });
    $("#btn_updateFeatures").click(function(e) 
    {
        $('#frm_updateFeatures').validate({
            submitHandler: function(form) {
                if($('.cb_feature:checkbox:checked').length == 0)
                {
                    $.toast({
                        heading: 'Error',
                        text:"Kindly select at least one feature",
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'info',
                        hideAfter: 3500
                    });
                }
                else
                {
                    $('#loading-modal').modal('show');
                    $(form).ajaxSubmit({
                        type:"POST",
                        data: $(form).serialize(),
                        url:"updateFeatures",
                        success: function(response) {
                            $("#loading-modal").modal('hide');
                            if(response.success==1)
                            {
                                $.toast({
                                    heading: 'Success',
                                    text:response.message,
                                    position: 'top-right',
                                    loaderBg: '#ff6849',
                                    icon: 'success',
                                    hideAfter: 3500,
                                    stack: 6
                                });
                            }
                            if(response.success==0)
                            {
                                $.toast({
                                    heading: 'Error',
                                    text:response.message,
                                    position: 'top-right',
                                    loaderBg: '#ff6849',
                                    icon: 'error',
                                    hideAfter: 3500
                                });
                            }
                        },
                        error: function() 
                        {
                            $("#loading-modal").modal('hide');
                            swal({title:"Error",text:"Error Sending Request!",type:"error"});
                        }
                    })
                }
            }
        })
    });
    $(document).on('click','.deleteProperty', function(e)
    {
        e.preventDefault();
        var uid = this.id;
        swal({   
            title: "Are you sure?",   
            text: "You want to delete this property",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, function(){ 
            swal.close();
            $('#loading-modal').modal('show');
            $.ajax({
                url: 'deleteProperty',
                type: 'POST',
                data:{
                    property:'property',
                    id:uid,
                    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                }
            })
            .done(function(response){
                $("#loading-modal").modal('hide');
                if(response.success==1)
                {
                    $.toast({
                        heading: 'Success',
                        text: response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 3500,
                        stack: 6
                    });
                }
                else
                {
                    $.toast({
                        heading: 'Error',
                        text:response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'error',
                        hideAfter: 3500
                    });
                }
                angular.element(document.getElementById('PropertyController')).scope().show();
            })
            .fail(function(){
                $("#loading-modal").modal('hide');
                swal({title:"Error",text:"Error Sending Request!",type:"error"});
            });
        });
    });
    $("#btn_addLead").click(function(e) 
    {
        var lead_status=$("#lead_status").val();
        if(lead_status!="")
        {
            $("#followup").attr("required","required");
        }
        else if($("#lead_status").val()=="")
        {
            $("#followup").removeAttr("required");
        }
        $('#frm_addLead').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"addLead",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            var validator = $( "#frm_addLead" ).validate();
                            validator.resetForm();
                            $.toast({
                                heading: 'Success',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                            angular.element(document.getElementById('LeadController')).scope().show();
                        }
                        if(response.success==0)
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
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
    $("#btn_updateLead").click(function(e) 
    {
        $('#frm_updateLead').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"updateLead",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            var validator = $("#frm_updateLead").validate();
                            validator.resetForm();
                            $('#edit-modal').modal('hide');
                            $.toast({
                                heading: 'Success',
                                text: response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                        }
                        else
                        {
                            alert(response);
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
                        }
                        angular.element(document.getElementById('LeadController')).scope().show();
                    },
                    error: function() {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
        })
    });
    $(document).on('click','.deleteLead', function(e)
    {
        e.preventDefault();
        var uid = this.id;
        swal({   
            title: "Are you sure?",   
            text: "You want to delete this lead",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, function(){ 
            swal.close();
            $('#loading-modal').modal('show');
            $.ajax({
                url: 'deleteLead',
                type: 'POST',
                data:{
                    lead:'lead',
                    id:uid,
                    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                }
            })
            .done(function(response){
                $("#loading-modal").modal('hide');
                if(response.success==1)
                {
                    $.toast({
                        heading: 'Success',
                        text: response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 3500,
                        stack: 6
                    });
                }
                else
                {
                    $.toast({
                        heading: 'Error',
                        text:response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'error',
                        hideAfter: 3500
                    });
                }
                angular.element(document.getElementById('LeadController')).scope().show();
            })
            .fail(function(){
                $("#loading-modal").modal('hide');
                swal({title:"Error",text:"Error Sending Request!",type:"error"});
            });
        });
    });
    $("#btn_nextFollowup").click(function(e) {
        $('#frm_nextFollowup').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"changeLeadStatus",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            var validator = $("#frm_nextFollowup").validate();
                            validator.resetForm();
                            // $('#change-modal').modal('hide');
                            $.toast({
                                heading: 'Success',
                                text: response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                            window.location.reload()
                        }
                        else
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
                        }
                        angular.element(document.getElementById('LeadController')).scope().show();	
                    },
                    error: function(response) {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
        })
    });
    $("#btn_AssignSalesManager").click(function(e) 
    {
        $('#frm_AssignSalesManager').validate({
            submitHandler: function(form) {
                if ($('input[name="sm_radio"]:checked').length == 0) 
                {
                    swal({title:"Error",text:"You haven't assigned any Sales Manager!",type:"error"});
                } 
                else 
                {
                    $(form).ajaxSubmit({
                        type:"POST",
                        data: $(form).serialize(),
                        url:"assignlead",
                        success: function(response) {
                            $("#loading-modal").modal('hide');
                            if(response.success==1)
                            {
                                var validator = $("#frm_AssignSalesManager").validate();
                                validator.resetForm();
                                $('#sm-modal').modal('hide');
                                $.toast({
                                    heading: 'Success',
                                    text: response.message,
                                    position: 'top-right',
                                    loaderBg: '#ff6849',
                                    icon: 'success',
                                    hideAfter: 3500,
                                    stack: 6
                                });
                            }
                            else
                            {
                                alert(response);
                                $.toast({
                                    heading: 'Error',
                                    text:response.message,
                                    position: 'top-right',
                                    loaderBg: '#ff6849',
                                    icon: 'error',
                                    hideAfter: 3500
                                });
                            }
                            angular.element(document.getElementById('LeadController')).scope().show();
                        },
                        error: function() {
                            $("#loading-modal").modal('hide');
                            swal({title:"Error",text:"Error Sending Request!",type:"error"});
                        }
                    })
                }
            }
        })
    });
    $("#btn_updateProfile").click(function(e) {
        $('#frm_updateProfile').validate({
            rules: {
                emp_mob:{
                    minlength:10,
                    maxlength:10,
                    digits:true
                }
            },
            messages: {
                emp_mob: {
                    minlength: "Please enter valid mobile number",
                    maxlength: "Please enter valid mobile number",
                    digits: "Please enter valid mobile number"
                }
            },
            submitHandler: function(form) 
            {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"updateEmployee",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            swal({
                                title: "Success!",
                                text: response.message,
                                type: "success"
                            }, function() {
                                window.location.assign("profile");
                            });		
                        }
                        else
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
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
    $("#btn_changePassword").click(function(e) {
        $('#frm_changePassword').validate({
            rules: {
                change_pass: {
                    required: true
                },
                emp_pass: {
                    required: true,
                    equalTo : "#act_pass"
                }
            },
            messages: {
                change_pass: {
                    required: "Please enter your new password"
                },
                emp_pass: {
                    required: "Please confirm your password",
                    equalTo: "Password does not match"
                }
            },
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"changeEmployeePass",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            $.toast({
                                heading: 'Success',
                                text: response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                            var validator = $("#frm_changePassword").validate();
                            validator.resetForm();
                        }
                        else if(response.success==0)
                        {
                            $.toast({
                                heading: 'Error',
                                text: response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
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
    $("#btn_AssignTeleCaller").click(function(e) {
        var cntrl_id = '';
        var class_id = $("#class_id").val();
        if(class_id == 1)
        {
            cntrl_id = 'WebContactController';
        }
        else if(class_id == 2)
        {
            cntrl_id = 'WebHomeLoanController';
        }
        else if(class_id == 3)
        {
            cntrl_id = 'WebPropertyController';
        }
        else if(class_id == 4)
        {
            cntrl_id = 'WebCallbackController';
        }
        else if(class_id == 5)
        {
            cntrl_id = 'WebSiteVisitController';
        }
        $('#frm_AssignTeleCaller').validate({
            submitHandler: function(form) 
            {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"convertToLead",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            swal({
                                title: "Success!",
                                text: response.message,
                                type: "success"
                            }, function() {
                                $('#tc-modal').modal('hide');
                                angular.element(document.getElementById(cntrl_id)).scope().show();
                            });		
                        }
                        else
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
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
    
    $("#btn_addjobDesc").click(function(e) 
    {
        $('#frm_addJobDescription').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"addJobDescription",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            $.toast({
                                heading: 'Success',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                        }
                        if(response.success==0)
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
                        }
                    },
                    error: function() 
                    {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
        })
    });

    $(document).on('click','.deleteJobDesc', function(e)
    {
        e.preventDefault();
        var uid = this.id;
        swal({   
            title: "Are you sure?",   
            text: "You want to delete this job description",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, function(){ 
            swal.close();
            $('#loading-modal').modal('show');
            $.ajax({
                url: 'deleteJobDesc',
                type: 'POST',
                data:{
                    deleteJobDesc : 'deleteJobDesc',
                    id:uid,
                    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                }
            })
            .done(function(response){
                $("#loading-modal").modal('hide');
                if(response.success==1)
                {
                    $.toast({
                        heading: 'Success',
                        text: response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'success',
                        hideAfter: 3500,
                        stack: 6
                    });
                }
                else
                {
                    $.toast({
                        heading: 'Error',
                        text:response.message,
                        position: 'top-right',
                        loaderBg: '#ff6849',
                        icon: 'error',
                        hideAfter: 3500
                    });
                }
                angular.element(document.getElementById('JobDescriptionController')).scope().show();
            })
            .fail(function(){
                $("#loading-modal").modal('hide');
                swal({title:"Error",text:"Error Sending Request!",type:"error"});
            });
        });
    });

    $("#btn_updatejobDesc").click(function(e) 
    {
        $('#frm_updateJobDescription').validate({
            submitHandler: function(form) {
                $('#loading-modal').modal('show');
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"updateJobDesc",
                    success: function(response) {
                        $("#loading-modal").modal('hide');
                        if(response.success==1)
                        {
                            $.toast({
                                heading: 'Success',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'success',
                                hideAfter: 3500,
                                stack: 6
                            });
                        }
                        if(response.success==0)
                        {
                            $.toast({
                                heading: 'Error',
                                text:response.message,
                                position: 'top-right',
                                loaderBg: '#ff6849',
                                icon: 'error',
                                hideAfter: 3500
                            });
                        }
                    },
                    error: function() 
                    {
                        $("#loading-modal").modal('hide');
                        swal({title:"Error",text:"Error Sending Request!",type:"error"});
                    }
                })
            }
        })
    });
});
