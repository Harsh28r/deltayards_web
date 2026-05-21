$("#course").change(function(){
	getSubject($("#course").val());
});

function getSubject(course_id) {
	$.ajax({
		type: "POST",
		url: "ajax/showSubject.php",
		data:'course_id='+course_id,
		success: function(data){
			var obj=JSON.parse(data);
			if(obj!="")
			{
				var dt='<option value="">Select Subject</option>';
				for(row in obj)
				{
					dt+='<option value="'+obj[row].subject_id+'">'+obj[row].subject_name+'</option>';
				}
				$("#subject").html(dt);
			}
			else
			{
				$("#subject").html('<option value="">Select Subject</option>');
			}
		}
	});
}
			
$("#subject").change(function(){
	getChapter($("#subject").val());
});
function getChapter(subject_id) {
	$.ajax({
		type: "POST",
		url: "ajax/showChapter.php",
		data:'subject_id='+subject_id,
		success: function(data){
			var obj=JSON.parse(data);
			if(obj!="")
			{
				var dt='<option value="">Select Chapter</option>';
				for(row in obj)
				{
					dt+='<option value="'+obj[row].chapter_id+'">'+obj[row].chapter_name+'</option>';
				}
				$("#chapter").html(dt);
			}
			else
			{
				$("#chapter").html('<option value="">Select Chapter</option>');
			}
		}
	});
}

