 $(function(){
    $('#acceptCGV').on('click', function() {
        if($(this).prop('checked'))
        {
            $('#bt-purchase').removeAttr('disabled');
        }
        else {
            $('#bt-purchase').attr('disabled', 'disabled');
        }
    });

    

    /*
    $('#formModal').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            method: $(this).attr('method'),
            url: $(this).attr('action'),
            data : $(this).serialize(),
            success : function(data, textStatus) {
                console.log(data);
                $('#divModal').modal('toggle');
                $('#notes i').removeClass('fa-star').addClass('fa-star-o');
                $('#formModal input[type="text"], #formModal textarea, #formModal select').val('');
                
                var html = '<div class="row">
                        <div class="col-md-12">
                            <?= displayNote($avis['note'], 5); ?> 
                            <?= $avis['prenom'].' '.substr($avis['nom'], 0, 1).'.'; ?>
                            <span class="pull-right"><?= $avis['last_post']==0 ? 'Aujourd\'hui' : 'Il y a '.pluriel($avis['last_post'], 'jour');?></span>
                            <p><?= $avis['commentaire']; ?></p>
                        </div>
                    </div>';
      
            },
            error : function(errorText) {
                alert(errorText);
                console.log(errorText);
            }
        });
    	
    });
    */
    /* --------------------------------- */
    /*          NOTATION                 */
    /* --------------------------------- */

    /*
        1.Quand on entre sur un etoile, on l'a remplit avec toutes les etoiles precedente et on vide les suivantes
        2.Quand on clique sur une etoile, on la valide elle et toutes les precédentes et on devalider les suivante
        3.Quand on sort de la zone des etoile, on remplit toutes celle qui sont valides
        4.Au double clique, on devalide tout
    */
    $('body').on('mouseenter', '#notes i', function(){
        var note = $(this).attr('data-note')
        $('#notes i').each(function(i, obj) {
            if($(this).attr('data-note')<=note) {
                $(this).addClass('fa-star').removeClass('fa-star-o');
            }
            else {
                $(this).addClass('fa-star-o').removeClass('fa-star');
            }
        });
    }).on('mouseleave', '#notes i', function() {
        $(this).parent().on('mouseleave', function(){
            $('#notes i').each(function(i, obj) {
                if(!$(this).hasClass('star-check')) {
                    $(this).addClass('fa-star-o').removeClass('fa-star');
                }
                else {
                    $(this).addClass('fa-star').removeClass('fa-star-o');
                }
            });
        }); 
    }).on('click', '#notes i', function() {
        var note = $(this).attr('data-note');
        $('#note').val(note);
        $('#notes i').each(function(i, obj) {
            if($(this).attr('data-note')<=note) {
                $(this).addClass('star-check');
            }
            else {
                $(this).removeClass('star-check');
            }
        });  
    }).on('dblclick', '#notes i', function() {
        $('#notes i').each(function(i, obj) {
            $(this).removeClass('star-check');
        });
    });



    //Afficher la modal Avis
    $('body').on('click', '.bt-modal', function(e) {
        openModal(function(data) {
            if(data.status==1) {
                $('#divModal').modal('hide');
                $('#notes i').removeClass('fa-star').addClass('fa-star-o');
                $('#formModal input[type="text"], #formModal textarea, #formModal select').val('');
                 $('#alert').html('');
                 var row = $('<div>', {class:'row avis'});
                 var col = $('<div>', {class:'col-md-12'});
                 var span_note = $('<span>', {class:'note'});
                 var span_user = $('<span>', {class:'user'});
                 var last_post = $('<span>', {class:'pull-right'});
                 var comment = $('<p>');
                 var quoteLeft = $('<div>', {class: 'quote-left'}).html('<i class="fa fa-quote-left"></i>');
                 var quoteRight = $('<div>', {class: 'quote-right'}).html('<i class="fa fa-quote-right"></i>');

                 last_post.html(data.html.last_post);
                 comment.append(quoteLeft).append(data.html.commentaire).append(quoteRight);
                 $('.no_comment').hide('fast');
                 $('#listAvis').prepend(row.hide().append(col.append(span_note.append(data.html.note))
                 .append(span_user.html(data.html.membre))
                 .append(last_post)
                 .append(comment)).show('slow'));

                 $('.thumbnail .avg-note').html(data.html.avgNote);
                 $('.thumbnail .nb-reviews').html(data.html.nbReviews);
                 //console.log();

                     /*
                <div class="row">
                        <div class="col-md-12">
                            <?= displayNote($avis['note'], 5); ?> 
                            <?= $avis['prenom'].' '.substr($avis['nom'], 0, 1).'.'; ?>
                            <span class="pull-right"><?= $avis['last_post']==0 ? 'Aujourd\'hui' : 'Il y a '.pluriel($avis['last_post'], 'jour');?></span>
                            <p><?= $avis['commentaire']; ?></p>
                        </div>
                    </div>
                 */ 
             }
             else {
                 $('#alert').html(data.message);
            }
            
        });
       

    });

    //declenchement de la google map
   google.maps.event.addDomListener(window, 'load', myMap);

});