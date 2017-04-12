$(function(){
	$('#cgv').on('click', function(){
		if($(this).is(':checked')){
			$('#bt-signup').removeAttr('disabled');
		}
		else {
			$('#bt-signup').attr('disabled', 'disabled');
		}
	})
});