
///////////////////////
        ////AJAXFORSEARCH
//////////////////////
function ajaxForSearch(curl) {
    var url=curl;
    $.ajax({
       type: "GET",
       dataType: "json",
       url:url,
   })
   .done(function( data, textStatus, jqXHR ) {
       console.log(data);
      if(data.length==0 || data ==='error'){
           $('.centered').empty();
           $('<div><h3>Su búsqueda no dió resultados.</h3></div>').attr('id','list').appendTo('.centered');
      }else{
           $('.centered').empty();

           var shop="";
           for (var i=0; i<data.length; i++ ){
            shop += '<div class="col-lg-4"><img class="img-responsive" id="'+data[i].idproduct+'" src="'+data[i].img+'"/><p>'+data[i].product+' - '+data[i].kg+'KG<br>'+data[i].brand+'<br>'+data[i].price+'€</p></div>'
            }

            $('.centered').html(
                shop
            );

            $(".pagination").bootpag({
                total: 2,
                page: 1,
                maxVisible: 4,
                next: 'NEXT',
                prev: 'PREV'
            }).on("page", function (e, num) {
                console.log(num);
                if (num == 1){
                    offset = 0;
                }else if(num === 2){
                    offset = 4;
                }
                e.preventDefault();
                $(".centered").load("modules/products/controller/controller_products.class.php", {'page_num': num});
            });
       }
   })
   .fail(function( data, textStatus, jqXHR ) {
       console.log("FAIL: "+data);
   })
}



///////////////////////
        ////CATEGORIES+SEARCH+CAROUSEL
//////////////////////
function redirect_page() {
    var cat=localStorage.getItem('category');
    var province=localStorage.getItem('province');
    var car=localStorage.getItem('carousel');

    if (cat){
        search();

    }else if (province){
        searchbar();

    }else if (car){
        fromcarousel();

    }else{
        ajaxForSearch("module/shop/controller/controller_shop.php?op=prods");

    }
}

///////////////////////
        ////CATEGORIES
//////////////////////
function search() {
    var cat=localStorage.getItem('category');


    ajaxForSearch("module/shop/controller/controller_shop.php?op=prods_select&name="+cat);
    localStorage.removeItem('category');
}

///////////////////////
        ////SEARCH
//////////////////////
function searchbar() {
    var province=localStorage.getItem('province');
    var shop=localStorage.getItem('shop');
    var auto=localStorage.getItem('val');


    ajaxForSearch("module/shop/controller/controller_shop.php?op=search&province="+province+"&shop="+shop+"&prod="+auto);
    localStorage.removeItem('province');
    localStorage.removeItem('shop');
    localStorage.removeItem('val');
}

///////////////////////
        ////CAROUSEL
//////////////////////
function fromcarousel() {
    var car=localStorage.getItem('carousel');


    ajaxForSearch("module/shop/controller/controller_shop.php?op=fromcarousel&name="+car);
    localStorage.removeItem('carousel');
}





///////////////////////
        ////READ PRODUCTS (INFO)
//////////////////////
function read_prod() {
    $('body').on("click", ".img-responsive", function() {

        var id = this.getAttribute('id');
        
        $.ajax({
            type: "GET",
            dataType: "JSON",
            url: "module/shop/controller/controller_shop.php?op=read_modal&modal=" + id,
        })
         .done(function(data) {
                 $('.ali').empty();
                 $('.filters_shop').empty();
                 
                 $('.centered').empty();


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

    });
}





///////////////////////
        ////FILTERS
//////////////////////

///////////////////////
        ////PINTAR FILTERS
//////////////////////
function setfilters() {
    $('.filters_shop').append(
        '<form name="selfilters" class="filtering">'+
        '<div class="fil">'+
        '<b>Product</b><br>'+
            '<input type="checkbox" id="check9" value="Protein" class="chk">Protein</br>'+
            '<input type="checkbox" id="check10" value="Mass_gainer" class="chk">Mass gainer</br>'+
            '<input type="checkbox" id="check11" value="Bcaa" class="chk">BCAA</br>'+
            '<input type="checkbox" id="check12" value="Creatine" class="chk">Creatine</br>'+
            '<input type="checkbox" id="check13" value="Vitamin" class="chk">Vitamin</br>'+
        '</div><br>'+
        '<div class="fil">'+
            '<b>Brand</b><br>'+
                '<input type="checkbox" id="check1" value="HSN" class="chk">HSN</br>'+
                '<input type="checkbox" id="check2" value="HSNraw" class="chk">HSNraw</br>'+
                '<input type="checkbox" id="check3" value="BiotechUSA" class="chk">BiotechUSA</br>'+
        '</div><br><br>'+
        '<div class="fil">'+
                '<b>Flavour</b><br>'+
                '<input type="checkbox" id="check4" value="Strawberry" class="chk">Strawberry</br>'+
                '<input type="checkbox" id="check5" value="Chocolate" class="chk">Chocolate</br>'+
                '<input type="checkbox" id="check6" value="Banana" class="chk">Banana</br>'+
                '<input type="checkbox" id="check7" value="Vanilla" class="chk">Vanilla</br>'+
                '<input type="checkbox" id="check8" value="Capuccino" class="chk">Capuccino</br>'+
                '</br>'+
        '</div><br><br>'+
    '</form>'
    )
}


///////////////////////
        ////USE FILTERS
//////////////////////
function filters() {
    var checks = "";
    var count = 0;

    $('#check1').click(function () {
        if($("#check1").prop('checked') == true){
                checks = checks + " OR brand = 'HSN'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR brand = 'HSN'", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check2').click(function () {
        if($("#check2").prop('checked') == true){
                checks = checks + " OR brand = 'HSNraw'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR brand = 'HSNraw'", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check3').click(function () {
        if($("#check3").prop('checked') == true){
                checks = checks + " OR brand = 'BiotechUSA'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR brand = 'BiotechUSA", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check4').click(function () {
        if($("#check4").prop('checked') == true){
                checks = checks + " OR flavour = 'Strawberry'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR flavour = 'Strawberry'", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check5').click(function () {
        if($("#check5").prop('checked') == true){
                checks = checks + " OR flavour = 'Chocolate'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR flavour = 'Chocolate'", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check6').click(function () {
        if($("#check6").prop('checked') == true){
                checks = checks + " OR flavour = 'Banana'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR flavour = 'Banana'", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check7').click(function () {
        if($("#check7").prop('checked') == true){
                checks = checks + " OR flavour = 'Vanilla'";
                count += 1;
                envia(checks, count);
                count += 1;
        }else{
                checks = checks.replace(" OR flavour = 'Vanilla'", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check8').click(function () {
        if($("#check8").prop('checked') == true){
                checks = checks + " OR flavour = 'Capuccino'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR flavour = 'Capuccino'", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check9').click(function () {
        if($("#check9").prop('checked') == true){
                checks = checks + " OR product = 'Protein'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR product = 'Protein'", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check10').click(function () {
        if($("#check10").prop('checked') == true){
                checks = checks + " OR product = 'Mass_gainer'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR product = 'Mass_gainer'", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check11').click(function () {
        if($("#check11").prop('checked') == true){
                checks = checks + " OR product = 'Bcaa'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR product = 'Bcaa'", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check12').click(function () {
        if($("#check12").prop('checked') == true){
                checks = checks + " OR product = 'Creatine'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR product = 'Creatine'", "");
                count -= 1;
                envia(checks, count);
        }
    });
    $('#check13').click(function () {
        if($("#check13").prop('checked') == true){
                checks = checks + " OR product = 'Vitamin'";
                count += 1;
                envia(checks, count);
        }
        else{
                checks = checks.replace(" OR product = 'Vitamin'", "");
                count -= 1;
                envia(checks, count);
        }
    });
}


function envia($checks, $count) {
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "module/shop/controller/controller_shop.php?op=filter&checks=" +$checks+ "&count=" +$count,
    })
    .done(function(data) {
        console.log(data);
        $('.centered').empty();
        $('#infoprod').empty();

        var shop="";
        for (var i=0; i<data.length; i++){
            shop += '<div class="col-lg-4"><img class="img-responsive" id="'+data[i].idproduct+'" src="'+data[i].img+'"/><p>'+data[i].product+' - '+data[i].kg+'KG<br>'+data[i].brand+'<br>'+data[i].price+'€</p></div>'
        }

        $('.centered').html(
            shop
        ); 
     })
     .fail(function( jqXHR, textStatus, errorThrown ) {
         if ( console && console.log ) {
             console.log( "La solicitud ha fallado: " +  textStatus);
         }
    });
}



///////////////////////
        ////MAPS
//////////////////////
function call_fodemap() {

    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAjPEcsq5RMcnRRGGclOQJiNXgCK_pCPn8&callback=fodemap";
    script.async;
    script.defer;
    document.getElementsByTagName('script')[0].parentNode.appendChild(script);

}


function fodemap() {

    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "module/shop/controller/controller_shop.php?op=maps",
    })
    .done(function( data, textStatus, jqXHR ) {
        // console.log(data);
        var markers = [];

        function initialize() {
        
            var map = new google.maps.Map(document.getElementById('mapcat'), {
                zoom: 7,
                center: new google.maps.LatLng(-33, 150),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        
            var infowindow = new google.maps.InfoWindow();
        
            for (var i = 0; i < data.length; i++) {
        
                var newMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
                    map: map,
                    title: data[i].name
                });
        
                google.maps.event.addListener(newMarker, 'click', (function (newMarker, i) {
                    return function () {
                        infowindow.setContent(data[i].name);
                        infowindow.open(map, newMarker);
                    }
                })(newMarker, i));
        
                markers.push(newMarker);
            }
        }
        
        initialize();

     })
     .fail(function( data, textStatus, jqXHR ) {
         console.log("FAIL: "+data);
     })
}




$(document).ready(function () {

    redirect_page();
    read_prod();
    setfilters();
    filters();
    call_fodemap();
    
})