
//////////
//CAROUSEL
//////
function carousel() {
    $.ajax({
        url: "module/inicio/controller/controller_homepage.php?op=carousel",
        type: "GET",
        dataType: "JSON",
    })
    .done(function(data) {
        var img = "";
        for (var i=0; i<data.length; i++ ){
            img += '<div id="s2"><img class="clickcar" id="'+data[i].id+'" src="'+data[i].url+'"></div>'
        }

        $('.slider').empty();
        $('.slider').html(
            img
        );


        $('.slider').bxSlider({
            mode: 'fade',
            captions: true,
            adaptiveHeight: true,
            speed: 400,
            auto: true,
            infiniteLoop: true
        });
     })
     .fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud ha fallado: " +  textStatus);
         }
    });
}



function click_carousel(){
    $('body').on('click', '.clickcar', function() {
        localStorage.removeItem('province');
        localStorage.removeItem('shop');
        localStorage.removeItem('val');
        localStorage.removeItem('category');

        var car = this.getAttribute('id');
        console.log(car);
    
        localStorage.setItem('carousel', car);
        if(car==""){ 
            toastr["info"]("Ingresa criterios de busqueda"),{"iconClass":'toast-info'};
        }else{    
            setTimeout('window.location.href = "index.php?page=controller_shop&op=list",1000');
        }
    });
}




//////////
//CATEGORIES
//////
function ajaxForSearch(offset){
    $.ajax({
        url: "module/inicio/controller/controller_homepage.php?op=category&offset="+offset,
        type: "GET",
        dataType: "JSON",

    })
    .done(function(data) {  
        if(data==="error"){
            console.log("mierda");
        }
        var cate = "";
        for (var i=0; i<data.length; i++ ){
            cate += '<div class="col-lg-4"><img class="img-responsive" id="'+data[i].id+'" src="'+data[i].url+'"/><p><b>'+data[i].cat+'</b></p></div>'
        }

        $('.cate').html(
            '<div class="bx-controls-direction">'+
            '<a class="prev">Prev</a> | '+
            '<a class="next">Next</a>'+
            '</div><br><br>'+
            cate
        );
     })
     .fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud ha fallado: " +  textStatus);
         }
    });
};



function category() {
    $.ajax({
        url: "module/inicio/controller/controller_homepage.php?op=count_cat",
        type: "GET",
        dataType: "JSON",
    })
    .done(function(data) {
        var cuenta = data.cuenta;
        var offset = 0;

        ajaxForSearch(offset);
    
        $(document).on("click", ".next", function() {
           offset += 4;
           if(offset>=cuenta){
               offset -= 4;
           }
           ajaxForSearch(offset);
        });
    
        $(document).on("click", ".prev", function() {
            offset -= 4;
            if(offset<0){
                offset += 4;
            }
            ajaxForSearch(offset);
        });
     })
}



function select_cat() {
    $('.cate').on("click", ".img-responsive", function() {
        localStorage.removeItem('carousel');
        localStorage.removeItem('province');
        localStorage.removeItem('shop');
        localStorage.removeItem('val');
        
        var cat = this.getAttribute('id');

        $.ajax({
            url: "module/inicio/controller/controller_homepage.php?op=cat_views&cat="+cat,
            type: "GET",
            dataType: "JSON",
        })

    
        localStorage.setItem('category', cat);
        if(cat==""){ 
            toastr["info"]("Ingresa criterios de busqueda"),{"iconClass":'toast-info'};
        }else{    
            setTimeout('window.location.href = "index.php?page=controller_shop&op=list",1000');
        }
    });
}





//////////
//MORE VISITED
//////
function byviews(offset) {
    $.ajax({
           url: "module/inicio/controller/controller_homepage.php?op=views&offset="+offset,
           type: "GET",
           dataType: "JSON",
   
       })
       .done(function(data) {  
           var vvv="";
           for (var i=0; i<data.length; i++ ){
            vvv += '<div class="col-lg-4"><img class="img-responsive" id="'+data[i].idproduct+'" src="'+data[i].img+'"/><p>'+data[i].product+' - '+data[i].kg+'KG<br>'+data[i].brand+'<br>'+data[i].price+'€</p></div>'
            }

            $('.byviews').html(
                '<div class="bx-controls-direction">'+
                '<a class="prev2">Prev</a> | '+
                '<a class="next2">Next</a>'+
                '</div><br><br>'+
                vvv
            );
        })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            if ( console && console.log ) {
                console.log( "La solicitud ha fallado: " +  textStatus);
            }
       });
   
   }



   function prods_views() {
    $.ajax({
        url: "module/inicio/controller/controller_homepage.php?op=count_prods",
        type: "GET",
        dataType: "JSON",
    })
    .done(function(data) {
        var cuenta = data.cuenta;
        var offset = 0;

        byviews(offset);
    
        $(document).on("click", ".next2", function() {
           offset += 4;
           if(offset>=cuenta){
               offset -= 4;
           }
           byviews(offset);
        });
    
        $(document).on("click", ".prev2", function() {
            offset -= 4;
            if(offset<0){
                offset += 4;
            }
            byviews(offset);
        });
     })
    }



   function read_prod_views() {
    $('.byviews').on("click", ".img-responsive", function() {

        var id = this.getAttribute('id');
        
        $.ajax({
            type: "GET",
            dataType: "JSON",
            url: "module/inicio/controller/controller_homepage.php?op=read_modal&modal=" + id,
        })
         .done(function(data) {

             $('.bx-pager').empty();
             $('.bx-wrapper').empty();
             $('.bx-prev').empty();
             $('.bx-next').empty();

             $('.ali').empty();
             $('.slider').empty();
             $('.categories').empty();
             $('.views').empty();


             $('#infoprod').empty();
             $('<div></div>').attr('id','details').appendTo('#infoprod');
             $("#details").html(
                '<div class="viewsinfo">'+
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

    });
}




$(document).ready(function () {

    carousel();
    click_carousel()
    category();
    select_cat();
    prods_views();
    read_prod_views();

});