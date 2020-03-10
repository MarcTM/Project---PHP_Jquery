
function firstslot(){
    $.ajax({ 
        type: "GET",
        dataType: "json",
        url: "view/inc/search/controller/controller_search.php?op=prov" 
    })
    .done(function( data, textStatus, jqXHR ) {
       var $drop = $("#province");
    //    $drop.empty();

         $.each(data, function(i, item) {
            $drop.append("<option>" + item.city + "</option>")        
        });
    })
    .fail(function( jqXHR, textStatus, errorThrown ) {
            console.log( "La solicitud ha fallado: " +  textStatus);
    });
}


function secondslot(){
    $("#province").on("change", function () {
        var province = $(this).val();

        $.ajax({
            type: "GET",
            dataType: "json",
            url: "view/inc/search/controller/controller_search.php?op=firstdrop&prov=" + province, 
        })
        .done(function( data, textStatus, jqXHR ) {
            // console.log( data );
            var $drop2 = $("#shop");
            $drop2.empty();
            $drop2.append("<option value=\"\">" + "[Select shop]" + "</option>");

            $.each(data, function(i, item) {
                $drop2.append("<option>" + item.name + "</option>")
            });
        });
    });
}


function autoc(){
    $("#autocom").on("keyup", function () {
        var auto=$(this).val();
        var shop=$("#shop").val();
        var autCom = {auto: auto, shop: shop}; 
        $.ajax({
            type: "POST",
            url: "view/inc/search/controller/controller_search.php?op=autocomplete",  
            data: autCom,
        })
        .done(function( data, textStatus, jqXHR ) {
            console.log(data);
            $('#optionsauto').fadeIn(1000).html(data);// se ve
            ///si selecciono valor
            $('.autoelement').on('click', function(){
                var id = $(this).children('a').attr('id');
                console.log(id);
                $('#autocom').val(id);
                //$('#autocom').val($('#'+id).attr('data'));
                $('#optionsauto').fadeOut(1000);
            });

            // $(".cosarara, .slider__img").on('click', function(){
            //     $('#optionsauto').fadeOut(1000);
            //     $('#autocom').val("");
            // });
        });
    });
}


function searchbutton(){
    $("#searchlist").on("click", function (){
        localStorage.removeItem('carousel');
        localStorage.removeItem('category');
        
        var province = $("#province").val();
        var shop=$("#shop").val();
        var auto=$("#autocom").val();

        console.log(province);
        console.log(shop);
        console.log(auto);

        localStorage.setItem('province', province);
        localStorage.setItem('shop', shop);
        localStorage.setItem('val', auto);

        if((province=="")||(shop=="")||(auto==="")){
            console.log("ingresa criterios de busqueda");
            // toastr["info"]("Ingresa criterios de busqueda"),{"iconClass":'toast-info'};
        }else{
            window.location.href = 'index.php?page=controller_shop&op=list';
        }
    });
}


$(document).ready(function () {

    firstslot();
    secondslot();
    autoc();
    searchbutton();

});