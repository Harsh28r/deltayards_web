$(document).ready(function()
{
	$(document).on('click', '.editBank', function(e){
		e.preventDefault();
		var uid = this.id;
		$('#modal-loader').show();
		$.ajax({
			url: 'getBank',
			type: 'POST',
			data:{
				bank:'bank',
				id:uid,
				csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
			}
		})
		.done(function(response)
		{
			if(response.success==1)
            {
				$('#edt_bank_id').val(response.data.bank_id);
				$('#edt_bank_name').val(response.data.bank_name);
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
			$('#modal-loader').hide();
		})
		.fail(function(){
			$('#modal-loader').hide();
		});
	});
	$(document).on('click', '.editEmployee', function(e){
		e.preventDefault();
		var uid = this.id;
		$('#modal-loader').show();
		$.ajax({
			url: 'getEmployee',
			type: 'POST',
			data:{
				employee:'employee',
				id:uid,
				csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
			}
		})
		.done(function(response)
		{
			if(response.success==1)
            {
				$('#edt_emp_id').val(response.data.emp_id);
				$('#edt_emp_name').val(response.data.emp_name);
				$('#edt_email').val(response.data.email);
				$('#edt_emp_mob').val(response.data.emp_mob);
				$('#edt_role_id').val(response.data.role_id);
				$('#edt_profile_img').val(response.data.profile_img);
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
			$('#modal-loader').hide();
		})
		.fail(function(){
			$('#modal-loader').hide();
		});
	});
	$(document).on('click', '.changeEmployeeStatus', function(e)
	{
		var id = this.id;
		$.ajax({
			url: 'changeEmployeeStatus',
			type: 'POST',
			data:{
					changeEmployeeStatus:'changeEmployeeStatus',
					id:id,
					csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
			 }
		})
		.done(function(response){
			if(response.success==1)
            {
				$.toast({
					heading: 'Success',
					text:response.message,
					position: 'top-right',
					loaderBg: '#ff6849',
					icon: 'success',
					hideAfter: 3500
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
			alert("Something went wrong. Please try again later.")
		});
	});
	$(document).on('click','.changePassword', function(e){
		var id=this.id;
		$("#change_id").val(id);	
		$('#change-modal').modal('show');
	})
	$("#reveal").on('change',function() {
		var $pwd1 = $("#act_pass");
		var $pwd2 = $("#conf_pass");
		if(this.checked==true)
		{
			$pwd1.attr('type', 'text');
			$pwd2.attr('type', 'text');
		}
		else
		{
			$pwd1.attr('type', 'password');
			$pwd2.attr('type', 'password');
		}
	});
	$(document).on('click', '.changePropertyStatus', function(e)
	{
		var id = this.id;
		$.ajax({
			url: 'changePropertyStatus',
			type: 'POST',
			data:{
					changePropertyStatus:'changePropertyStatus',
					id:id,
					csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
			 }
		})
		.done(function(response){
			if(response.success==1)
            {
				$.toast({
					heading: 'Success',
					text:response.message,
					position: 'top-right',
					loaderBg: '#ff6849',
					icon: 'success',
					hideAfter: 3500
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
			alert("Something went wrong. Please try again later.")
		});
	});
	$(document).on('click', '.editLead', function(e)
	{
		e.preventDefault();
		var uid = this.id;
		$('#modal-loader').show();
		$.ajax({
			url: 'getLead',
			type: 'POST',
			data:{
				lead:'lead',
				id:uid,
				csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
			}
		})
		.done(function(response)
		{
			if(response.success==1)
            {
				$('#edt_lead_id').val(response.data.lead_id);
				$('#edt_lead_name').val(response.data.lead_name);
				$('#edt_lead_email').val(response.data.lead_email);
				$('#edt_lead_mob').val(response.data.lead_mob);	
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
			$('#modal-loader').hide();
		})
		.fail(function(){
			$('#modal-loader').hide();
		});
	});
	$(document).on('click','.nextFollowp', function(e){
		var id=this.id;
		$("#change_id").val(id);	
		$('#change-modal').modal('show');
	});
	$(document).on('change','#ready_to_move', function(e)
    {
        let isChecked = $(this)[0].checked;
        if(isChecked)
        {
            $(".ready").after('\
			<div class="col-xl-3 col-12 form-group ready_cont">\
				<label class="form-label">Number of Wings</label>\
				<input type="number" class="form-control" name="build_wings" id="build_wings" placeholder="eg. 2">\
			</div>\
			<div class="col-xl-3 col-12 form-group ready_cont">\
				<label class="form-label">Number of Floors</label>\
				<input type="number" class="form-control" name="build_floors" id="build_floors" placeholder="eg. 7">\
			</div>\
			');
        }
        else
        {
            $(".ready_cont").remove();
        }
    });
	$(document).on('change','#under_construction', function(e)
    {
        let isChecked = $(this)[0].checked;
        if(isChecked)
        {
            $(".under").after('\
			<div class="col-xl-3 col-12 under_cont">\
				<div class="form-group">\
					<label class="form-label">Possession Date</label>\
					<input type="month" placeholder="mm/yyyy" class="form-control" name="possesssion_date" id="possesssion_date" placeholder="Choose Possession Date">\
				</div>\
			</div>\
			');
        }
        else
        {
            $(".under_cont").remove();
        }
    });
	$(document).on('click', '.editNotification', function(e){
		e.preventDefault();
		var uid = this.id;
		$('#modal-loader').show();
		$.ajax({
			url: 'getNotification',
			type: 'POST',
			data:{
				notification:'notification',
				id:uid,
				csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
			}
		})
		.done(function(response)
		{
			if(response.success==1)
            {
				$('#edt_not_id').val(response.data.not_id);
				$('#edt_not_title').val(response.data.not_title);
				$('#edt_not_message').val(response.data.not_message);
				$('#edt_not_img').val(response.data.not_img);
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
			$('#modal-loader').hide();
		})
		.fail(function(){
			$('#modal-loader').hide();
		});
	});
	$(document).on('click', '.publishNotification', function(e)
	{
		var id = this.id;
		swal({   
            title: "Are you sure?",   
            text: "You want to publish this notification",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, function(){ 
            swal.close();
            $('#loading-modal').modal('show');
            $.ajax({
				url: 'publishNotification',
				type: 'POST',
				data:{
						publishNotification:'publishNotification',
						id:id,
						csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
				}
			})
			.done(function(response)
			{
				$("#loading-modal").modal('hide');
				if(response.success==1)
				{
					$.toast({
						heading: 'Success',
						text:response.message,
						position: 'top-right',
						loaderBg: '#ff6849',
						icon: 'success',
						hideAfter: 3500
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
				alert("Something went wrong. Please try again later.")
			});
        });
	});
	$(document).on('click', '.changeUserStatus', function(e)
	{
		var id = this.id;
		$.ajax({
			url: 'changeUserStatus',
			type: 'POST',
			data:{
					changeUserStatus:'changeUserStatus',
					id:id,
					csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
			 }
		})
		.done(function(response){
			if(response.success==1)
            {
				$.toast({
					heading: 'Success',
					text:response.message,
					position: 'top-right',
					loaderBg: '#ff6849',
					icon: 'success',
					hideAfter: 3500
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
			
			angular.element(document.getElementById('WebUserController')).scope().show();
		})
		.fail(function(){
			alert("Something went wrong. Please try again later.")
		});
	});
	
	$(document).on('click', '.changeJobDescStatus', function(e)
	{
		var id = this.id;
		$.ajax({
			url: 'changeJobDescStatus',
			type: 'POST',
			data:{
					changeJobDescStatus:'changeJobDescStatus',
					id:id,
					csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
			 }
		})
		.done(function(response){
			if(response.success==1)
            {
				$.toast({
					heading: 'Success',
					text:response.message,
					position: 'top-right',
					loaderBg: '#ff6849',
					icon: 'success',
					hideAfter: 3500
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
			alert("Something went wrong. Please try again later.")
		});
	});
});