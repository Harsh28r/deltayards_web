$(document).on('change', '#csv_course', function(e){
	e.preventDefault();
	getEdtSubject($("#csv_course").val());
});

function getEdtSubject(course_id) {
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
				$("#csv_subject").html(dt);
			}
			else
			{
				$("#csv_subject").html('<option value="">Select Subject</option>');
			}
		}
	});
}
			
$(document).on('change', '#csv_subject', function(e){
	e.preventDefault();
	getEdtChapter($("#csv_subject").val());
});
function getEdtChapter(subject_id) {
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
				$("#csv_chapter").html(dt);
			}
			else
			{
				$("#csv_chapter").html('<option value="">Select Chapter</option>');
			}
		}
	});
}