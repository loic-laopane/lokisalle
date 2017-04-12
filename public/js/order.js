$(function(){
 
  $('#formCommande').on('change', 'select', function(e){
      $('#formCommande').submit();
  });
	$('#formCommande').on('submit', function(e){
		//on stope le comportement dde base
		e.preventDefault();
		$.ajax({
			url : $(this).attr('action'),
			method : $(this).attr('method'),
			dataType : 'json',
			data : $(this).serialize(),
			success : function(data, textStatus) {
        	//console.log(data);
				$('#order').html(data.html);
        //declenchement de la google map
        //google.maps.event.addDomListener(window, 'load', myMap);
			},
			error : function(error, errorText) {
				console.log(error + ' ' + errorText);
			}
		});
	});
    
     if($('#get_id').val()!=='') {
      $('#commande_id').val($('#get_id').val());
      $('#formCommande').submit();
    };
});