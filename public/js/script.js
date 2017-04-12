$(function() {
   var datepicker_option = {
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      minDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      firstDay: 1,
      dateFormat: 'dd/mm/yy',
      showAnim: 'fadeIn',
      changeYear: true,

   };

   //Application des options par defaut
   $.datepicker.setDefaults(datepicker_option);

   //Definition des options particulier sur la date de debut
   dateArrivee = $("#dateArrivee").datepicker({
      defaultDate: +1,
      minDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),

   }).on('change', function () {
      //Modification des options sur la date de fin au change de la date de debut
      var date = $("#dateArrivee").val().split('/');
      var newDate = date[1] + '/' + date[0] + '/' + date[2];
      dateDepart.datepicker('option', 'minDate', new Date(Date.parse(newDate) + 24 * 60 * 60 * 1000));
   });
   //Definition des options particuliere de la date de fin
   dateDepart = $("#dateDepart").datepicker({
      defaultDate: +1,
      minDate: dateArrivee.datepicker('option', 'minDate'),

   });


   /*==================================
   =            Data table            =
   ==================================*/
   
   $('.datatable').DataTable({
      "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
         "language": {
            "decimal":        "",
             "emptyTable":     "Aucune donnée disponible",
             "info":           "Entrées de _START_ à _END_ sur _TOTAL_",
             "infoEmpty":      "Entrées de 0 à 0 sur 0",
             "infoFiltered":   "(filtered from _MAX_ total entries)",
             "infoPostFix":    "",
             "thousands":      ",",
             "lengthMenu":     "Voir _MENU_ entrées",
             "loadingRecords": "Chargement...",
             "processing":     "Processing...",
             "search":         "Recherche:",
             "zeroRecords":    "Aucun résultat trouvé",
             "paginate": {
                 "first":      "<<",
                 "last":       ">>",
                 "next":       ">",
                 "previous":   "<"
             },
             "aria": {
                 "sortAscending":  ": activate to sort column ascending",
                 "sortDescending": ": activate to sort column descending"
             }
        }
      });
      $('body').on('click', '.action', function(e){
        e.preventDefault();
         var redirect = $(this).attr('data-redirect');
         var href = $(this).attr('data-href');
         if(redirect!=undefined)
         {
            if(confirm('Êtes-vous sûr de vouloir supprimer l\'entrée ?')) {
               
               window.location.href = redirect;
            }
         }
         else if(href!=undefined) window.location.href = href;

      });
   
   /*=====  End of Data table  ======*/
   $('#divModalDetail').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget); // Button that triggered the modal
      var modal = $(this);
     var view = button.data('view');
     var id_entry = button.data('id');
     //console.log(button.data('url'));
     $.ajax({
        url: button.data('url'), 
        method:'POST',
        dataType: 'html', 
        data: {id:id_entry, table: view},
        success : function(data) {
          //console.log(data);
          modal.find('.modal-body').html(data);
          modal.find('#bt_update').attr('data-href', '/'+view+'/edit/'+id_entry);
        },

        error : function(txt, textStatus) {
          console.log(txt +' ' +textStatus);
        }
     });
   });

   /*----------  Gestion des zoom photo  ----------*/
   $('body').on('click', '.photo', function() {
    //console.log($(this));
      var photo = $(this);
      var blackWindow = $('<div>', {class:'black-window'}).css('display', 'none');
      var container = $('<div>', {class:'container-photo'});
      var img = $('<img>', {src: photo[0].src, alt:'Zoom'});
      var bt_close = $('<i>', {class: 'fa fa-close fa-4x bt_close', title:'fermer'}).css({position:'absolute', right:'20px', top:'20px'});
      $('body').append(blackWindow.html(container.append(img).append(bt_close)).fadeIn());

   });
   $('body').on('click',  '.bt_close', function() {
   // console.log('remove');
      $('.black-window').fadeOut('fast', function(){
          $(this).remove();
      });
   }).on('dblclick', '.black-window', function() {
      $(this).fadeOut('fast', function(){
          $(this).remove();
      });
   });

   //affichage du bt close on load
   $('input[type="text"], input[type="email"], input[type="number"], input[type="password"]').each(function(){
      if($(this).val()!='') {
        $(this).next('span').fadeIn('fast');
      }
   });

   //affichage du bt close quand on tape sur le clavier
   $('input[type="text"], input[type="email"], input[type="number"], input[type="password"]').on('keyup change', function() {
      if($(this).val()!='') {
        $(this).next('span').show('fast');
      }
      else {
        $(this).next().hide('fast');
      }
   });
   //Effacement des champ
   $('.clear-field').on('click', function() {
      var target = $(this).data('target');
      $(target).val('');
      $(this).hide('fast');
   });
   
});
/**
 * [openModal description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function openModal(callback) 
{
    $('.container').on('submit', '#formModal', function(e){
        e.preventDefault();
        $.ajax({
            method: $(this).attr('method'),
            url: $(this).attr('action'),
            data : $(this).serialize(),
            dataType: 'json',
            success : function(data, textStatus) {
              //console.log(data)
              callback(data);
            },
            error : function(errorText, err) {
                alert(err);
                console.log(err);
            }
        });
        
    });
}

/**
 * [geocodeAddress description]
 * @param  {[type]} geocoder   [description]
 * @param  {[type]} resultsMap [description]
 * @return {[type]}            [description]
 */
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('adresse').value + ' ' 
                + document.getElementById('cp').value + ' '
                + document.getElementById('ville').value;
  //var adress = '8 rue de londres, 75008 Paris';
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      var contentWindow = '<div class="">';
          contentWindow += '<strong>'+document.getElementById('name').value+'</strong>';
          contentWindow += '<p>'+document.getElementById('adresse').value+'<br>'
                      +document.getElementById('cp').value+' '+ document.getElementById('ville').value+'</p>';
        contentWindow += '</div>';
    var infowindow = new google.maps.InfoWindow({
        content:contentWindow
    });
    google.maps.event.addListener(marker, 'click', function(){
        infowindow.open(map,marker);
    });
    infowindow.open(map,marker);
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}

/**
 * [init_map description]
 * @return {[type]} [description]
 */
function init_map(){
    var myOptions = {
        zoom:10,
        center:new google.maps.LatLng(48.856614,2.3522219000000177),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'), myOptions);
    marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(48.856614,2.3522219000000177)});
    infowindow = new google.maps.InfoWindow({
        content:'<strong>lokisalle</strong><br>Paris, France<br>'
    });
    google.maps.event.addListener(marker, 'click', function(){
        infowindow.open(map,marker);
    });
    infowindow.open(map,marker);
}

/**
 * [myMap description]
 * @return {[type]} [description]
 */
function myMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: 48.8650582, lng: 2.301988499999993}
  });
    var geocoder = new google.maps.Geocoder();

    geocodeAddress(geocoder, map);


    //Coordonne de Parimis
    var latlng = new google.maps.LatLng(48.8650582,2.301988499999993);
    var mapOptions = {
        center: {lat: 48.8650582, lng: 2.301988499999993},
        zoom: 18,
        scrollwheel: false,
        zoomControl: false,
        disableDefaultUI: true,
        scaleControl: false
    };
}
