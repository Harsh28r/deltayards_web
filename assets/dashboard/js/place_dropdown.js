$("#class_country").change(function(){
	getState($("#class_country").val());
});

function getState(country_id) {
	$.ajax({
		type: "POST",
		url: "ajax/showState.php",
		data:'country_id='+country_id,
		success: function(data){
			var obj=JSON.parse(data);
			if(obj!="")
			{
				var dt='<option value="">Select State</option>';
				for(row in obj)
				{
					dt+='<option value="'+obj[row].state_id+'">'+obj[row].state_name+'</option>';
				}
				$("#class_state").html(dt);
			}
			else
			{
				$("#class_state").html('<option value="">Select State</option>');
			}
		}
	});
}
			
$("#class_state").change(function(){
	getCity($("#class_state").val());
});
function getCity(state_id) {
	$.ajax({
		type: "POST",
		url: "ajax/showCity.php",
		data:'state_id='+state_id,
		success: function(data){
			var obj=JSON.parse(data);
			if(obj!="")
			{
				var dt='<option value="">Select City</option>';
				for(row in obj)
				{
					dt+='<option value="'+obj[row].city_id+'">'+obj[row].city_name+'</option>';
				}
				$("#class_city").html(dt);
			}
			else
			{
				$("#class_city").html('<option value="">Select City</option>');
			}
		}
	});
}