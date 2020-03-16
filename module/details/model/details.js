function show_details(){
    var id = localStorage.getItem('infoprod');

    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "module/details/controller/controller_details.php?op=show_details&id=" + id,
    })
        .done(function(data) {

                $('#infoprod').empty();
                $('<div></div>').attr('id','details').appendTo('#infoprod');
                
                $("#details").html(
                        '<div class="tolainfo">'+
                        '<br><span><img class="img-responsive" src="'+data.img+'"></span></br>'+
                        '<br><span>Code:   <span id="codprod1">'+data.codprod+'</span></span></br>'+
                        '<br><span>Product:   <span id="product1">'+data.product+'</span></span></br>'+
                        '<br><span>Ingredients:     <span id="ingredients1">'+data.ingredients+'</span></span></br>'+
                        '<br><span>Flavour:     <span id="flavour1">'+data.flavour+'</span></span></br>'+
                        '<br><span>Brand:     <span id="brand1">'+data.brand+'</span></span></br>'+
                        '<br><span>KG:    <span id="kg1">'+data.kg+'</span></span></br>'+
                        '<br><span>Date of caducity:     <span id="datecaducity1">'+data.datecaducity+'</span></span></br>'+
                        '<br><span>Description:     <span id="datecaducity1">'+data.descr+'</span></span></br>'+
                        '<br><span>Price:     <span id="datecaducity1">'+data.price+'€</span></span></br>'+
                        '</div>'
                );
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            if ( console && console.log ) {
                console.log( "La solicitud ha fallado: " +  textStatus);
            }
        });
}




function apibooks(){
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "https://www.googleapis.com/books/v1/volumes?q=nutrition",
    })
     .done(function(data) {
         var api = "";
         for (var i=0; i<4; i++ ){
            var check = "false";
            var random = Math.floor(Math.random() * data.items.length) + 0;
            if (i === 0){
                var arr = [];
                arr.push(random); 

                var link = data.items[random].volumeInfo.infoLink;
                var title = data.items[random].volumeInfo.title;
                var img = data.items[random].volumeInfo.imageLinks.smallThumbnail;
                api += '<div class="col-lg-4"><a href="'+link+'" target="_blank"><img src="'+img+'"/><p><b>"'+title+'"</b></p><a/></div>'
            }else{
                for (var i=0; i<arr.length; i++){
                    if (random === arr[i]){
                        check = "true";
                    }
                }
            
                if (check === "true"){
                    i -= 1;
                }else{
                    arr.push(random);            

                    var link = data.items[random].volumeInfo.infoLink;
                    var title = data.items[random].volumeInfo.title;
                    var img = data.items[random].volumeInfo.imageLinks.smallThumbnail;
                    api += '<div class="col-lg-4"><a href="'+link+'" target="_blank"><img src="'+img+'"/><p><b>"'+title+'"</b></p><a/></div>'
                }
            }
         }
         
         $('.books').html(
             api
         );
     })
     .fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud ha fallado: " +  textStatus);
         }
    });
}




$(document).ready(function () {

    show_details();
    apibooks();

})