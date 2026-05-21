$(document).ready(function()
{
    $("#show_pass").on('change',function() 
	{
		var $password = $("#log_pass");
		if(this.checked==true)
		{
			$password.attr('type', 'text');
		}
		else
		{
			$password.attr('type', 'password');
		}
	});
});