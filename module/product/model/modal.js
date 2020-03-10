$(document).ready(function () {
    $('#datatable').DataTable();

    $('body').on("click", ".product", function() {

        var id = this.getAttribute('id');
        
        $.ajax({
            type: "GET",
            dataType: "JSON",
            url: "module/product/controller/controller_products.php?op=read_modal&modal=" + id,
        })
         .done(function(data) {
                 $('#modalcontent').empty();
                 $('<div></div>').attr('id','details').appendTo('#modalcontent');
                
                 $("#details").html(
                            '<br><span>Code:   <span id="idproduct1">'+data.idproduct+'</span></span></br>'+
                            '<br><span>Code:   <span id="codprod1">'+data.codprod+'</span></span></br>'+
                            '<br><span>Product:   <span id="product1">'+data.product+'</span></span></br>'+
                            '<br><span>Ingredients:     <span id="ingredients1">'+data.ingredients+'</span></span></br>'+
                            '<br><span>Flavour:     <span id="flavour1">'+data.flavour+'</span></span></br>'+
                            '<br><span>Brand:     <span id="brand1">'+data.brand+'</span></span></br>'+
                            '<br><span>KG:    <span id="kg1">'+data.kg+'</span></span></br>'+
                            '<br><span>Date of caducity:     <span id="datecaducity1">'+data.datecaducity+'</span></span></br>'+
                            '<br><span>Description:     <span id="datecaducity1">'+data.descr+'</span></span></br>'+
                            '<br><span>Price:     <span id="datecaducity1">'+data.price+'€</span></span></br>'+
                            '<br><span>IMG source:     <span id="datecaducity1">'+data.img+'</span></span></br>'+
                            '<br><span>Views:     <span id="datecaducity1">'+data.views+'</span></span></br>'
                 );

                $("#modalcontent").dialog({
                    width: 650, //<!-- ------------- ancho de la ventana -->
                    height: 500, //<!--  ------------- altura de la ventana -->
                    // show: "scale", <!-- ----------- animación de la ventana al aparecer -->
                    //hide: "scale", <!-- ----------- animación al cerrar la ventana -->
                    resizable: "false", //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
                    position: {
                        my: "center center",
                        at: "center center",
                        of: window
                    },                    modal: "true", //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close");
                        }
                    },
                    show: {
                        effect: "blind",
                        duration: 500
                    },
                    hide: {
                        effect: "blind",
                        duration: 500
                    }
                });
         })
         .fail(function( jqXHR, textStatus, errorThrown ) {
             if ( console && console.log ) {
                 console.log( "La solicitud ha fallado: " +  textStatus);
             }
        });

    });
});