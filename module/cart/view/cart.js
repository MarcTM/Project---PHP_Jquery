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
///ADD TO CART (AND CHECK IF ALREADY EXISTS)
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
                    console.log("Not yet");
                }else{
                    console.log("Already exists");
                }
            }
        })
    })

}



$(document).ready(function () {

    tocart();

})