$(function() {
	$('input[name="negative_marking"]').on('click', function() {
		if ($(this).val() == 'Yes') {
			$('#negative_marks').show();
		}
		else {
			$('#negative_marks').hide();
		}
	});
	$('#exam_type').on('change', function() {
		if ($(this).val() == 'Subjective') {
			$('#question_type').show();
		}
		else {
			$('#question_type').hide();
		}
	});
	$('input[name="restrict_question"]').on('click', function() {
		if ($(this).val() == 'Yes') {
			$('#restrict_question_time').show();
		}
		else {
			$('#restrict_question_time').hide();
		}
	});
	$('input[name="capture_photo"]').on('click', function() {
		if ($(this).val() == 'Yes') {
			$('#capture_photo_interval').show();
		}
		else {
			$('#capture_photo_interval').hide();
		}
	});
	$('input[name="question_navigation"]').on('click', function() {
		if ($(this).val() == 'Yes') {
			$('#window_switch_number').show();
		}
		else {
			$('#window_switch_number').hide();
		}
	});
	$('input[name="two_language"]').on('click', function() {
		if ($(this).val() == 'Yes') {
			$('.show_language').show();
		}
		else {
			$('.show_language').hide();
		}
	});
});