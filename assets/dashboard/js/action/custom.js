$(document).ready(function()
{
    var i=1;
    $('.cb_places').change(function() 
    {
        let isChecked = $(this)[0].checked;
        let id=$(this).attr("id");
        if(isChecked)
        {
            $("."+id).after('<input type="text" class="form-control cb_places_txt" name="near_by_places_text" id="txt_'+id+'">');
        }
        else
        {
            $("#txt_"+id).remove();
        }
    });
    $(document).on('change','#amenity_chk_14', function(e)
    {
        let isChecked = $(this)[0].checked;
        let id=$(this).attr("id");
        if(isChecked)
        {
            $("."+id).after('<input type="text" class="form-control" name="other_amenity" id="other_amenity_'+id+'" placeholder="Enter comma separated amenities" required>');
        }
        else
        {
            $("#other_amenity_"+id).remove();
        }
    });
    $('#feature_chk_12').change(function() 
    {
        let isChecked = $(this)[0].checked;
        let id=$(this).attr("id");
        if(isChecked)
        {
            $("."+id).after('<input type="text" class="form-control" name="other_assets" id="other_assets_'+id+'" placeholder="Enter comma separated assets" required>');
        }
        else
        {
            $("#other_assets_"+id).remove();
        }
    });
    $(document).on('click','.assignSM', function(e)
    { 
        var id=this.id;
        $.ajax({
            type:"POST",
            data:{
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
            },
            url:"manager_list",
            success: function(response) {
                if(response.success=='1')
                {
                    var data = response.data;
                    var output='<input type="hidden" name="lead_id" value="'+id+'">';
                    for(var i=0;i<data.length;i++)
                    {
                        output+='<div class="media align-items-center"><div class="demo-radio-button"><input name="sm_radio" type="radio" id="radio_'+data[i].id+'" value="'+data[i].id+'"/><label for="radio_'+data[i].id+'"><span class="flexbox flex-grow gap-items text-truncate" href="" data-toggle="quickview"><img class="avatar" id="sm_img" src="media/'+data[i].img+'" alt="Sales Manager"><div class="media-body text-truncate"><h6 id="sm_name">'+data[i].name+'</h6><small><span id="sm_email">'+data[i].email+'</span><span id="sm_mob" class="divider-dash">'+data[i].mobile+'</span></small></div></span></label></div></div>'
                    }
                    $('.data').html(output);
                    $('#sm-modal').modal('show');
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
    });	
	$("#btnAdd").bind("click", function () 
    {
        i=Math.floor(Math.random() * 1000000);
		$(".dynamic_config").append('\
            <div class="row mb-10 config_div">\
                <hr class="my-15">\
                <input type="hidden" name="u_id" value="'+i+'">\
                <div class="col-xl-4 col-12 form-group">\
                    <label class="form-label">Configuration</label>\
                    <select class="form-control" name="prop_rooms_'+i+'" id="prop_rooms" required>\
                        <option value="">select</option>\
                        <option>1 BHK</option>\
                        <option>2 BHK</option>\
                        <option>3 BHK</option>\
                        <option>4 BHK</option>\
                        <option>5 BHK</option>\
                        <option>6 BHK</option>\
                        <option>7 BHK</option>\
                        <option>8 BHK</option>\
                        <option>9 BHK</option>\
                        <option>10 BHK</option>\
                    </select>\
                </div>\
                <div class="col-xl-4 col-12 form-group">\
                    <label class="form-label">Carpet Area&nbsp;<span class="text-secondary">(sqft)</span></label>\
                    <input type="number" class="form-control" name="prop_carpet_area_'+i+'" id="prop_carpet_area" placeholder="Enter your property area in sqft">\
                </div>\
                <div class="col-xl-4 col-12 form-group">\
                    <label class="form-label">Price</label>\
                    <input type="number" class="form-control" name="prop_price_'+i+'" id="prop_price" placeholder="Enter your property price">\
                </div>\
                <div class="col-xl-4 col-12 form-group">\
                    <label class="form-label">Layout Blue Print</label>\
                    <input type="file" class="form-control" name="blue_print_'+i+'" id="blue_print">\
                </div>\
                <div class="col-xl-4 col-12 form-group">\
                    <label class="form-label">Layout 3D Print</label>\
                    <input type="file" class="form-control" name="threed_print_'+i+'" id="threed_print">\
                </div>\
                <div class="col-xl-4 col-12 form-group">\
                    <label class="form-label" style="display: block;">&nbsp;</label>\
                    <button type="button" class="waves-effect waves-circle btn btn-social-icon btn-danger remove" title="Remove Room Configuration"><span class="fa fa-trash"></span></a>\
                </div>\
            </div>\
        ');
	});
	$("body").on("click", ".remove", function () 
	{
		$(this).closest(".config_div").remove();
	});
    $("#btnAddClientRoom").bind("click", function () 
    {
        i=Math.floor(Math.random() * 1000000);
		$(".dynamic_config").append('\
            <div class="row mb-2 config_div">\
                <hr class="my-15">\
                <input type="hidden" name="u_id" value="'+i+'">\
                <div class="col-xl-3 col-12 form-group">\
                    <label class="form-label">Configuration</label>\
                    <select class="form-control nice-select" name="prop_rooms_'+i+'" id="prop_rooms" required>\
                        <option value="">select</option>\
                        <option>1 BHK</option>\
                        <option>2 BHK</option>\
                        <option>3 BHK</option>\
                        <option>4 BHK</option>\
                        <option>5 BHK</option>\
                        <option>6 BHK</option>\
                        <option>7 BHK</option>\
                        <option>8 BHK</option>\
                        <option>9 BHK</option>\
                        <option>10 BHK</option>\
                    </select>\
                </div>\
                <div class="col-xl-3 col-12 form-group">\
                    <label class="form-label">Min Price</label>\
                    <input type="number" class="form-control" name="prop_min_price_'+i+'" id="prop_min_price" placeholder="Enter your property min price">\
                </div>\
                <div class="col-xl-3 col-12 form-group">\
                    <label class="form-label">Max Price</label>\
                    <input type="number" class="form-control" name="prop_max_price_'+i+'" id="prop_max_price" placeholder="Enter your property max price">\
                </div>\
                <div class="col-xl-3 col-12 form-group">\
                    <label class="form-label" style="display: block;">&nbsp;</label>\
                    <button type="button" class="waves-effect waves-circle btn btn-social-icon btn-danger remove" title="Remove Room Configuration"><span class="fa fa-trash"></span></a>\
                </div>\
            </div>\
        ');
	});
    $(document).on("change","#select_all", function(e)
    {
        e.preventDefault();
        var status = this.checked; 
        $(".check_lead_ids").each(function(){ 
            this.checked = status; 
        });
    });
    $(document).on('click','.assignLeads', function(e)
    { 
        var btn_id=this.id;
        var a=document.getElementsByName("lead_ids");
		var j=0;
		for (i=0, l=a.length; i<l; i++)
		{
			if (a[i].checked==true)
			{
				var id=a[i].value;
				var checkValues = $('input[name=lead_ids]:checked').map(function()
				{
					return $(this).val();
				}).get();
				document.getElementById("chk_checked").value=checkValues;
				j++;
			}
		}
		if (j==0)
		{
			swal({
			  title: "please select atleast one lead to assign",
			  imageUrl: 'static/dashboard/img/no-image.png'
			});
		}
		else if(j>0)
		{
            $("#class_id").val(btn_id);
            $.ajax({
                type:"POST",
                data:{
                    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                },
                url:"telecaller_list",
                success: function(response) {
                    if(response.success=='1')
                    {
                        var data = response.data;
                        var output='<input type="hidden" name="lead_id" value="'+id+'">';
                        for(var i=0;i<data.length;i++)
                        {
                            output+='<div class="media align-items-center"><div class="demo-radio-button"><input name="emp_id" type="radio" id="radio_'+data[i].id+'" value="'+data[i].id+'"/><label for="radio_'+data[i].id+'"><span class="flexbox flex-grow gap-items text-truncate" href="" data-toggle="quickview"><img class="avatar" id="sm_img" src="media/'+data[i].img+'" alt="Sales Manager"><div class="media-body text-truncate"><h6 id="sm_name">'+data[i].name+'</h6><small><span id="sm_email">'+data[i].email+'</span><span id="sm_mob" class="divider-dash">'+data[i].mobile+'</span></small></div></span></label></div></div>'
                        }
                        $('.data').html(output);
                        $('#tc-modal').modal('show');
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
    });	
    $("#prop_pincode").on("input", function(e) 
    {
        var pin=$(this).val();
        if(pin.length==6)
        {
            $.getJSON("https://api.postalpincode.in/pincode/" + pin, function (data) 
			{
                $("#prop_city").val(data[0].PostOffice[0].District);
				$("#prop_state").val(data[0].PostOffice[0].State);
			})
        }
        else
        {
            $("#prop_city").val("");
			$("#prop_state").val("");
        }
    });
    $(document).on('change','#thumbnail', function(evt)
    {
        // alert('thumbnail hello');
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;
    
        // FileReader support
        if (FileReader && files && files.length) {
            // alert(files.length)
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('thumb_img').src = fr.result;
                
                // $("#setThumb").html('Update Elevation Image');

                var file_data = $("#thumbnail").prop("files")[0];
                var form_data = new FormData();
                form_data.append("file", file_data)
                form_data.append("prop_id", $("#prop_id").val())
                form_data.append("image_type", 'Thumbnail')
                form_data.append("csrfmiddlewaretoken",document.getElementsByName('csrfmiddlewaretoken')[0].value)
                // alert(form_data.get('prop_id'));
                $.ajax({
                    url:"uploadPropImages", // Upload Script
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,
                    type: 'post',
                    success: function(response) 
                    {
                        if(response.success==1)
                        {
                            $("#thumbnail").attr("id","thumbnail_update");
                            $(".thumb_list").html('\
                            <li><a href="#" id="updateThumb" onclick="$(\'#thumbnail_update\').trigger(\'click\'); return false;">Update Elevation Image</a></li>\
                            <li><a href="#" id="'+response.image_id+'" class="deletePropImage">Remove Elevation Image</a></li>\
                            <input type="hidden" value="'+response.image_url+'" id="img_'+response.image_id+'">\
                            <input type="hidden" value="'+response.image_id+'" id="image_id">\
                            ')
                        }
                        
                        // alert(data);
                    }
                });
            }
            fr.readAsDataURL(files[0]);
        }
    
        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }
    });
    $(document).on('change','#thumbnail_update', function(evt)
    {
        // alert('thumbnail update hello');
        
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;
    
        // FileReader support
        if (FileReader && files && files.length) {
            // alert(files.length)
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('thumb_img').src = fr.result;
                
                // $("#setThumb").html('Update Elevation Image');

                var file_data = $("#thumbnail_update").prop("files")[0];
                var form_data = new FormData();
                form_data.append("file", file_data)
                form_data.append("prop_id", $("#prop_id").val())
                form_data.append("image_type", 'Thumbnail')
                form_data.append("image_id", $("#image_id").val())
                form_data.append("old_image_url", $("#img_"+$("#image_id").val()).val())
                form_data.append("csrfmiddlewaretoken",document.getElementsByName('csrfmiddlewaretoken')[0].value)
                // alert(form_data.get('prop_id'));
                $.ajax({
                    url:"updateThumbnail", // Upload Script
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,
                    type: 'post',
                    success: function(response) 
                    {
                        if(response.success==1)
                        {
                            $(".thumb_list").html('\
                            <li><a href="#" id="updateThumb" onclick="$("#thumbnail_update").trigger("click"); return false;">Update Elevation Image</a></li>\
                            <li><a href="#" id="'+response.image_id+'" class="deletePropImage">Remove Elevation Image</a></li>\
                            <input type="hidden" value="'+response.image_url+'" id="img_'+response.image_id+'">\
                            <input type="hidden" value="'+response.image_id+'" id="image_id">\
                            ')
                        }
                        
                        // alert(data);
                    }
                });
            }
            fr.readAsDataURL(files[0]);
        }
    
        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }
    });
});