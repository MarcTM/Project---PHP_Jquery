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




///////////////////////
        ////AJAXFORSEARCH
//////////////////////
function ajaxForSearch(method) {
   switch (method){
        
    // CATEGORIES
        case "cat":
            var cat = localStorage.getItem('category');

            if (!localStorage.getItem('offset')){
                var offset = 0;
                localStorage.setItem('offset', offset);
            }else{
                var offset = localStorage.getItem('offset');
            }

            $.ajax({
                type: "GET",
                dataType: "json",
                url:"module/shop/controller/controller_shop.php?op=countcat&name="+cat,
                })
                .done(function( cuenta, textStatus, jqXHR ) {
                    var count = cuenta.cuenta;
                    if (count===0){
                        var pages = 0;
                    }else{
                        if (count % 4 === 0){
                            var pages = count / 4;
                        }else{
                            var pages = count / 4 + 1;
                        }
                    }

                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url:"module/shop/controller/controller_shop.php?op=fromcat&name="+cat+"&offset="+offset,
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
            
                                        if(!localStorage.getItem('page')){
                                            var page = 1;
                                        }else{
                                            var page = localStorage.getItem('page');
                                        }
                            
                                        $(".pagination").bootpag({
                                            total: pages,
                                            page: page,
                                            maxVisible: 4,
                                            next: 'NEXT',
                                            prev: 'PREV'
                                        }).on("page", function (e, num) {
                                            page = num;
                                            localStorage.setItem('page', page);
                                            console.log(num);
                                            if (num == 1){
                                                offset = 0;
                                                localStorage.setItem('offset', offset)
                                            }else{
                                                var sum = 0;
                                                for (var i = 1; i<num; i++){
                                                    sum += 4;
                                                }
                                                offset = sum;
                                                localStorage.setItem('offset', offset)
                                            }
                                            e.preventDefault();
                                            ajaxForSearch("cat");
                                        });
                                }
                            })
                            .fail(function( data, textStatus, jqXHR ) {
                                console.log("FAIL: "+data);
                            })
                })
        break;
    
        // SEARCH BAR
        case "searchbar":
            var province=localStorage.getItem('province');
            var shop=localStorage.getItem('shop');
            var auto=localStorage.getItem('val');

            if (!localStorage.getItem('offset')){
                var offset = 0;
                localStorage.setItem('offset', offset);
            }else{
                var offset = localStorage.getItem('offset');
            }

            $.ajax({
                type: "GET",
                dataType: "json",
                url:"module/shop/controller/controller_shop.php?op=countsearchbar&province="+province+"&shop="+shop+"&prod="+auto,
                })
                .done(function( cuenta, textStatus, jqXHR ) {
                    var count = cuenta.cuenta;
                    if (count===0){
                        var pages = 0;
                    }else{
                        if (count % 4 === 0){
                            var pages = count / 4;
                        }else{
                            var pages = count / 4 + 1;
                        }
                    }

                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url:"module/shop/controller/controller_shop.php?op=searchbar&province="+province+"&shop="+shop+"&prod="+auto+"&offset="+offset,
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
            
                                        if(!localStorage.getItem('page')){
                                            var page = 1;
                                        }else{
                                            var page = localStorage.getItem('page');
                                        }
                            
                                        $(".pagination").bootpag({
                                            total: pages,
                                            page: page,
                                            maxVisible: 4,
                                            next: 'NEXT',
                                            prev: 'PREV'
                                        }).on("page", function (e, num) {
                                            page = num;
                                            localStorage.setItem('page', page);
                                            console.log(num);
                                            if (num == 1){
                                                offset = 0;
                                                localStorage.setItem('offset', offset)
                                            }else{
                                                var sum = 0;
                                                for (var i = 1; i<num; i++){
                                                    sum += 4;
                                                }
                                                offset = sum;
                                                localStorage.setItem('offset', offset)
                                            }
                                            e.preventDefault();
                                            ajaxForSearch("searchbar");
                                        });
                                }
                            })
                            .fail(function( data, textStatus, jqXHR ) {
                                console.log("FAIL: "+data);
                            })
                })
        break;

        // CAROUSEL
        case "carousel":
            var car=localStorage.getItem('carousel');

            if (!localStorage.getItem('offset')){
                var offset = 0;
                localStorage.setItem('offset', offset);
            }else{
                var offset = localStorage.getItem('offset');
            }

            $.ajax({
                type: "GET",
                dataType: "json",
                url:"module/shop/controller/controller_shop.php?op=countcarousel&name="+car,
                })
                .done(function( cuenta, textStatus, jqXHR ) {
                    var count = cuenta.cuenta;
                    if (count===0){
                        var pages = 0;
                    }else{
                        if (count % 4 === 0){
                            var pages = count / 4;
                        }else{
                            var pages = count / 4 + 1;
                        }
                    }

                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url:"module/shop/controller/controller_shop.php?op=fromcarousel&name="+car+"&offset="+offset,
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
            
                                        if(!localStorage.getItem('page')){
                                            var page = 1;
                                        }else{
                                            var page = localStorage.getItem('page');
                                        }
                            
                                        $(".pagination").bootpag({
                                            total: pages,
                                            page: page,
                                            maxVisible: 4,
                                            next: 'NEXT',
                                            prev: 'PREV'
                                        }).on("page", function (e, num) {
                                            page = num;
                                            localStorage.setItem('page', page);
                                            console.log(num);
                                            if (num == 1){
                                                offset = 0;
                                                localStorage.setItem('offset', offset)
                                            }else{
                                                var sum = 0;
                                                for (var i = 1; i<num; i++){
                                                    sum += 4;
                                                }
                                                offset = sum;
                                                localStorage.setItem('offset', offset)
                                            }
                                            e.preventDefault();
                                            ajaxForSearch("carousel");
                                        });
                                }
                            })
                            .fail(function( data, textStatus, jqXHR ) {
                                console.log("FAIL: "+data);
                            })
                })
        break;

        // NORMAL SHOP
        case "normal":
              if (!localStorage.getItem('offset')){
                var offset = 0;
                localStorage.setItem('offset', offset);
            }else{
                var offset = localStorage.getItem('offset');
            }


            $.ajax({
                type: "GET",
                dataType: "json",
                url:"module/shop/controller/controller_shop.php?op=countnormal",
                })
                .done(function( cuenta, textStatus, jqXHR ) {
                    var count = cuenta.cuenta;
                    if (count===0){
                        var pages = 0;
                    }else{
                        if (count % 4 === 0){
                            var pages = count / 4;
                        }else{
                            var pages = count / 4 + 1;
                        }
                    }

                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url:"module/shop/controller/controller_shop.php?op=normalshop&offset="+offset,
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
                            
                                        if(!localStorage.getItem('page')){
                                            var page = 1;
                                        }else{
                                            var page = localStorage.getItem('page');
                                        }
        
                                        $(".pagination").bootpag({
                                            total: pages,
                                            page: page,
                                            maxVisible: 4,
                                            next: 'NEXT',
                                            prev: 'PREV'
                                        }).on("page", function (e, num) {
                                            page = num;
                                            localStorage.setItem('page', page);
                                            console.log(num);
                                            if (num == 1){
                                                offset = 0;
                                                localStorage.setItem('offset', offset)
                                            }else{
                                                var sum = 0;
                                                for (var i = 1; i<num; i++){
                                                    sum += 4;
                                                }
                                                offset = sum;
                                                localStorage.setItem('offset', offset)
                                            }
                                            e.preventDefault();
                                            ajaxForSearch("normal");
                                        });
                                }
                            })
                            .fail(function( data, textStatus, jqXHR ) {
                                console.log("FAIL: "+data);
                            })
                })

                setfiltersnormal();
                filtersnormal();
        break;
   }
}


///////////////////////
        ////REDIRECT CATEGORIES,SEARCH,CAROUSEL,NORMAL SHOP
//////////////////////
function redirect_page() {
    var cat=localStorage.getItem('category');
    var province=localStorage.getItem('province');
    var car=localStorage.getItem('carousel');

    if (cat){
        localStorage.removeItem('offset');
        localStorage.removeItem('page');
        ajaxForSearch("cat");
    }else if (province){
        localStorage.removeItem('offset');
        localStorage.removeItem('page');
        ajaxForSearch("searchbar");
    }else if (car){
        localStorage.removeItem('offset');
        localStorage.removeItem('page');
        ajaxForSearch("carousel");
    }else{
        localStorage.removeItem('offset');
        localStorage.removeItem('page');
        ajaxForSearch("normal");
    }
}





///////////////////////
        ////READ PRODUCTS (INFO)
//////////////////////
function read_prod() {
    $('body').on("click", ".img-responsive", function() {

        var id = this.getAttribute('id');
        localStorage.setItem('infoprod', id);

        setTimeout('window.location.href = "index.php?page=controller_details&op=list",1000');
    })
}




///////////////////////
        ////FILTERS
//////////////////////
function setfiltersnormal() {
    $('.filters_shop').html(
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

function filtersnormal() {
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
        ////DELETE LOCAL STORAGE FOR SHOP
//////////////////////
function dellocalstorage(){
    $('body').on('click', '#localdel', function() {
        localStorage.removeItem('province');
        localStorage.removeItem('shop');
        localStorage.removeItem('val');
        localStorage.removeItem('category');
        localStorage.removeItem('carousel');
    });
}






////////////////////
//APIs
///////////////
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

    call_fodemap();
    redirect_page();
    read_prod();
    dellocalstorage();
    apibooks();  
    
})