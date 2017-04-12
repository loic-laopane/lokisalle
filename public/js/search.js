$(function(){
  //quand on modifier une valeur du formulaire
  $('#formSearch').on('change', 'input, select', function(e){
      //on remet la valeur de la limit par defaut
      //on reinitialise la valeur max a vide
      initLimit();
      //puis on soumettre le formulaire
      $('#formSearch').submit();
  });
	$('#formSearch').on('submit', function(e){
		//on stope le comportement dde base
		e.preventDefault();
		$.ajax({
			url : $(this).attr('action'),
			method : $(this).attr('method'),
			dataType : 'json',
			data : $(this).serialize(),
			success : function(data, textStatus) {
          //console.log(data);
          //On stock le nombre de resultat total
          $('#limit').attr('data-max', data.total);
          if($('#limit').val()== $('#limit').attr('data-default')) {
             $('#listeProduits').html('');
          }
          $('.nb_result').html(data.nb_result 
                            + ' résultat'
                            + (data.nb_result>1 ? 's' : '')
                            +' affichés sur ' 
                            + data.total 
                            + ' trouvé' 
                            + (data.total>1 ? 's' : ''));
          $.each(data.data, function(key, obj){
            //console.log(obj);
            //Si on ne trouve pas de resultat, on affiche le message html
            if(obj.id==null) {
              $('#listeProduits').html(obj.html);
            }
            //On on trouve des resultats
            else {
              var thumb_id = $('#produit_'+obj.id);
              //Si une div portant le meme id n'existe pas, on ajoute la div
              if(thumb_id.length==0)
                $('#listeProduits').append(thumb(obj.data).fadeIn('slow'));
            }

          });
          //S'il a plus de resultats possible, on affiche le bouton
          if(data.seeMore==true) {
            $('#seeMore').html('<div class="seeMore btn btn-success">Voir plus de resultats</div>');
          }
          else {
            $('#seeMore').html('');
          }
          
        
				//$('#listeProduits').css('display', 'none').html(data).fadeIn('slow');
			},
			error : function(error, errorText, c) {
				console.log(error + ' ' + errorText, + ' ' +c);
        console.log( $(this).serialize());
			}
		});
	});

  //quand on click sur Voir plus...
  $('#seeMore').on('click', function(e){
    //la limit est incrémenté du data-step
    //$('#limit').val(parseInt($('#limit').val())+parseInt($('#limit').attr('data-step')));
    $('#limit').val(parseInt($('#listeProduits').children().length)+parseInt($('#limit').attr('data-step')));
    listeProduits
    //Puis on resoumet le formulaire avec la nouvelle limite
    $('#formSearch').submit();
  });

  //gestion du input range jquery-ui
  $.ajax({
      url: 'location/maxPrix',
      method : 'POST',
      dataType: 'json',
      data : {max:1},
      success : function(data, textStatus){
        //console.log(data);
        $('body').append(data);
          $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: data.max,
            values: [ 0, data.max ],
            /*slide: function( event, ui ) {
              console.log(event);
              $( "#amountRange" ).val( "€" + ui.values[ 0 ] + " - €" + ui.values[ 1 ] );
              $( "#prixMin" ).val( ui.values[ 0 ]);
              $( "#prixMax" ).val( ui.values[ 1 ]);

              //On submit le form après avoir reinit
              initLimit();
              $('#formSearch').submit();

            },*/
            change: function( event, ui ) {
              //console.log(event);
              $( "#amountRange" ).val( "€" + ui.values[ 0 ] + " - €" + ui.values[ 1 ] );
              $( "#prixMin" ).val( ui.values[ 0 ]);
              $( "#prixMax" ).val( ui.values[ 1 ]);

              //On submit le form après avoir reinit
              initLimit();
              $('#formSearch').submit();

            }
          });

          $( "#amountRange" ).val( "€" + $( "#slider-range" ).slider( "values", 0 ) + " - €" + $( "#slider-range" ).slider( "values", 1 ) );
          $( "#prixMin" ).val( $( "#slider-range" ).slider( "values", 0 ));
          $( "#prixMax" ).val( $( "#slider-range" ).slider( "values", 1 ));

      },
      error : function(a, b, c) {
          console.log('erreur ajax : '+a+ ' : ' + b);
      },
      complete : function(responseText, textStatus) {
          //console.log(responseText);
      }
  });
    

});

function initLimit(){
  $('#limit').val($('#limit').attr('data-default'));
  $('#limit').attr('data-max', '');
}

function thumb(obj){

  var main = $('<div>', {class: 'col-xs-12 col-sm-6 col-md-4', id:'produit_'+obj.id, style:'display:none'}); //parent
  var thumbnail = $('<div>', {class: 'thumbnail'});
  var photo = $('<div>', {class: 'photo-salle'});
  var head = $('<div>', {class: 'head-caption'});
  var body = $('<div>', {class: 'body-caption'});
  var ratings = $('<div>', {class: 'ratings'});

  var link_photo = $('<a>', {href: '/location/detail/'+obj.id+'-Salle-'+obj.titre.replace(' ', '-')+'-'+obj.categorie});
  var link_titre = $('<a>', {href: '/location/detail/'+obj.id+'-Salle-'+obj.titre.replace(' ', '-')+'-'+obj.categorie});
  var img = $('<img>', {src: obj.photo, alt: obj.titre});
  var price = $('<h4>', {class: 'pull-right'}).html('&euro;' + obj.prix);
  var titre = $('<h4>');
  var categorie = $('<h5>').html(obj.categorie_html);
  var cut_desc = obj.description.length>40 ? obj.description.substr(0, 40)+'...' : obj.description;
  var description = $('<div>', {class: 'content-caption'}).html(cut_desc);
  var date = $('<div>', {class: 'date-caption'}).html(obj.date_html);
  var rate = $('<p>', {class: 'pull-right'});
  var button = $('<a>', {href: '/location/detail/'+obj.id+'-Salle-'+obj.titre.replace(' ', '-')+'-'+obj.categorie, 
                        class:'btn btn-primary btn-xs', 
                        role:'button'
                      }).html('<i class="fa fa-search"></i> Détails');
  var note = $('<p>').html(obj.stars + ' ' + obj.reviews + ' '+ 'avis');

  return main.append(thumbnail.append(photo.append(link_photo.html(img)))
    .append(head.append(price).append(titre.append(link_titre.html(obj.titre))).append(categorie))
    .append(body.append(description).append(date))
    .append(ratings.append(rate.append(button)).append(note)));

}