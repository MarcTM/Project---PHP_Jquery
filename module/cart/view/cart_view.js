////////////////////
///CHECK IF USER IS LOGED
//////////////////////
var logedshowcart = function() {
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




//////////////////
////////"GO TO SHOP" BUTTON
//////////////////
function gotoshop(){
    $('body').on("click", "#gotoshop", function() {
        setTimeout('window.location.href = "index.php?page=controller_shop&op=list",1000');
    })

}




/////////////////
/////CHECK USER'S CART
/////////////////////
var cart = function() {
    return new Promise(function(resolve) {
        $.ajax({
            type: "GET",
            url: "module/cart/controller/controller_cart.php?op=showcart",
            dataType: "JSON"
        })
          .done(function( cart, textStatus, jqXHR ) {
              resolve(cart);
          })
    });
}




/////////////////
/////SHOW CART
/////////////////////
function showcart(){
    logedshowcart()
    .then(function(loged){
        if(loged==="true"){
// LOGED
            cart()
            .then(function(cart){
                if(cart==="error"){
// LOGED AND NO CART
                    $('.cart').empty();
                    $('<div></div>').attr('id','cartdetails').appendTo('.cart');

                    $("#cartdetails").html(
                            '<p class="emptycart"><b>CART IS EMPTY</b></p>'+
                            '<div class="gotoshop"><input type="button" id="gotoshop" value="GO TO SHOP"></div>'
                    );

                }else{
// LOGED AND CART
                    $('.cart').empty();
                    $('<div></div>').attr('id','leftcart').appendTo('.cart');
                    $('<div></div>').attr('id','rightcart').appendTo('.cart');

                    var showcart = "";
                    var showtotal = "";
                    var totalcart = 0;

                    for(var i=0; i<cart.length; i++){
                        showcart+="<div class='cartrow'><table class='tablecart'>"+
                        "<tr><td><img class='imgcart' id='"+cart[i].idproduct+"' src='"+cart[i].img+"'/></td>"+
                        "<td><b>"+cart[i].product+" - "+cart[i].brand+"</b><br><br>"+cart[i].kg+"Kg "+cart[i].flavour+"<br>Preferred consumption: "+cart[i].datecaducity+"<br><br><b>"+cart[i].price+"€</b><br><input type='button' class='deletefromcart' id='"+cart[i].idproduct+"' value='DELETE FROM CART'/></td>"+
                        "<td><b>"+cart[i].total+"€</b><br><input type='number' class='changeq' id='"+cart[i].idproduct+"' min='1' max='99' style='width: 7em' value='"+cart[i].quantity+"'/></td></tr>"+
                        "</table></div>";
                        
                        totalcart+=parseInt(cart[i].total);
                    }

                    $('#leftcart').html(
                        showcart
                    );

                    $('#rightcart').html(
                        "<div class='totalcart'><table class='tabletotal'"+
                        "<tr><td>Subtotal: "+totalcart+"€</td></tr>"+
                        "<tr><td><b>Total: "+totalcart+"€</b></td></tr>"+
                        "<tr><td><input type='button' class='finishorder' value='FINISH ORDER'/></td></tr>"+
                        "</table></div>"
                    );

                }
            })
        }else{
// NOT LOGED
            if(!localStorage.getItem('cart')){
// NOT LOGED AND NO LOCALSTORAGE
                $('.cart').empty();      
                $('<div></div>').attr('id','cartdetails').appendTo('.cart');

                $("#cartdetails").html(
                        '<p class="emptycart"><b>CART IS EMPTY</b></p>'+
                        '<div class="gotoshop"><input type="button" id="gotoshop" value="GO TO SHOP"></div>'
                );

            }else{
// NOT LOGED AND LOCALSTORAGE

            }
        }
    })
}




////////////////
////DELETE FROM CART
///////////////////////
function deletefromcart(){
    $('body').on("click", ".deletefromcart", function() {
        var id = this.getAttribute('id');

        logedshowcart()
        .then(function(loged){
            if(loged==="true"){
// DELETE FOR LOGED USER
                $.ajax({
                    type: "GET",
                    url: "module/cart/controller/controller_cart.php?op=delete&id="+id,
                })
                .done(function( del, textStatus, jqXHR ) {
                    showcart();
                })

            }else{
// DELETE FOR NOT LOGED USER
                
            }
        })
    })
}





/////////////////
//////UPDATE QUANTITY
////////////////////
function quantity(){
    //////
    // KEYUP
    //////
    $('body').on("keyup", ".changeq", function() {
        var auto=$(this).val();
        var id = this.getAttribute('id');

        console.log(auto);
        console.log(id);
        logedshowcart()
        .then(function(loged){
            if(loged==="true"){
// LOGED USER CHANGE QUANTITY
                $.ajax({
                    type: "GET",
                    url: "module/cart/controller/controller_cart.php?op=changequ&num="+auto+"&id="+id,
                })

                showcart();

            }else{
// NOT LOGED USER CHANGE QUANTITY
            }
        })
    })
    

    //////
    //CHANGE
    //////
    $('body').on("change", ".changeq", function() {
        var auto=$(this).val();
        var id = this.getAttribute('id');
        
        console.log(auto);
        console.log(id);
        logedshowcart()
        .then(function(loged){
            if(loged==="true"){
// LOGED USER CHANGE QUANTITY
                $.ajax({
                    type: "GET",
                    url: "module/cart/controller/controller_cart.php?op=changequ&num="+auto+"&id="+id,
                })

                showcart();

            }else{
// NOT LOGED USER CHANGE QUANTITY
            }
        })
    })
}






////////////
/////CHECK-OUT
////////////////
function checkout(){
    $('body').on("click", ".finishorder", function() {
        logedshowcart()
        .then(function(loged){
            if(loged==="true"){
// CHECKOUT FOR LOGED USER
                alert("PRODUCTS PURCHASED");
                setTimeout('window.location.href = "index.php?page=controller_cart&op=checkout",1000');

            }else{
// CHECKOUT FOR NOT LOGED USER
                alert("NOT LOGED");

            }
        })
    })
}




$(document).ready(function () {

    showcart();
    gotoshop();
    deletefromcart();
    quantity();
    checkout();

})