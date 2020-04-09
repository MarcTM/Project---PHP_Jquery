////////////////////
///CHECK IF USER IS LOGED
//////////////////////
var logincart = function() {
    return new Promise(function(resolve) {
        $.ajax({
            type: "GET",
            url: "module/cart/controller/controller_cart.php?op=logincart",
        })
          .done(function( loged, textStatus, jqXHR ) {
              resolve(loged);
          })
    });
}




////////////////////
///ADD TO CART
//////////////////////
var addselected = function(id) {
    return new Promise(function(resolve) {
        $.ajax({
            type: "GET",
            url: "module/cart/controller/controller_cart.php?op=addproduct&id="+id,
            dataType: "JSON"
        })
          .done(function( data, textStatus, jqXHR ) {
              resolve(data);
          })
    });
}


function tocart(){

    $('body').on("click", ".addtocart", function() {
        var id = this.getAttribute('id');

        logincart()
        .then(function(loged){
            if(loged==="true"){
// ADD TO DATABASE(USER LOGED)   
                addselected(id)
                .then(function(data){
                    if(data!=="not exists"){
                        alert("YOU ALREADY HAVE THIS PRODUCT IN YOUR CART");
                    }else{
                        alert("PRODUCT ADDED TO CART");
                    }
                })
            }else{
// ADD TO LOCALSTORAGE(USER NOT LOGED)
                if(!localStorage.getItem('cart')){
                    var arrcart = [];
                    var objcart = {id: id, quantity: 1};

                    arrcart.push(objcart);

                    var JSONcart = JSON.stringify(arrcart);
                    localStorage.setItem('cart', JSONcart);

                    alert("PRODUCT ADDED TO CART");
                }else{
                    var repeat = "false";
                    var arrcart = JSON.parse(localStorage['cart']);

                    for(var i=0; i<arrcart.length; i++){
                        if(arrcart[i].id===id){
                            repeat="true";
                        }
                    }

                    if(repeat==="true"){
                        alert("YOU ALREADY HAVE THIS PRODUCT IN YOUR CART");
                    }else{
                        var objcart = {id: id, quantity: 1};
                        arrcart.push(objcart);

                        var JSONcart = JSON.stringify(arrcart);
                        localStorage.setItem('cart', JSONcart);

                        alert("PRODUCT ADDED TO CART");
                    }
                }
            }
        })
    })

}



$(document).ready(function () {

    tocart();

})