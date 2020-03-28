// Promise used in shop.js
var checksession = function() {
    return new Promise(function(resolve) {
        $.ajax({ 
                type: 'GET', 
                url: "module/login/controller/controller_login.php?op=check_session", 
            })
            .done(function( session, textStatus, jqXHR ) {
                resolve(session);
            })
    });
}


// Promise used in shop.js
var favuser = function() {
    return new Promise(function(resolve) {
        $.ajax({ 
                type: 'GET', 
                url: "module/favorites/controller/controller_favorites.php?op=checkfav",
                dataType: "JSON", 
            })
            .done(function(data2, textStatus, jqXHR) {
                resolve(data2);
            })
    });
}


var hearth = function() {
    return new Promise(function(resolve) {
        $.ajax({
            type: "GET",
            url: "module/favorites/controller/controller_favorites.php?op=checkuser"
        })
          .done(function( data, textStatus, jqXHR ) {
              resolve(data);
          })
    });
}

function tofav(){
    $('body').on("click", ".favorites", function() {
        var id = this.getAttribute('id');
        var estado = this.getAttribute('src');

        if(estado==="view/assets/img/favorites/corazonblanco.png"){
            $(this).attr("src", "view/assets/img/favorites/corazonrojo.png");
        }else{
            $(this).attr("src", "view/assets/img/favorites/corazonblanco.png");
        }

    
        hearth()
        .then(function(data) {
            if(data==="yes"){
                if(estado==="view/assets/img/favorites/corazonblanco.png"){
                    $.ajax({
                        type: "GET",
                        url: "module/favorites/controller/controller_favorites.php?op=addfav&id=" + id
                    })
                }else{
                    $.ajax({
                        type: "GET",
                        url: "module/favorites/controller/controller_favorites.php?op=delfav&id=" + id
                    })
                }
            }else{
                alert("You must be registered to add to favorites")
                setTimeout('window.location.href = "index.php?page=controller_login&op=list_login";',1000);
            }
         })
    })
}





$(document).ready(function(){

    tofav();

})