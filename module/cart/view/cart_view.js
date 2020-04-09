
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

// DATABASE
var cartdb = function() {
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

// LOCALSTORAGE
var localcart = function(id) {
    return new Promise(function(resolve) {
        $.ajax({
            type: "GET",
            url: "module/cart/controller/controller_cart.php?op=showlocalcart&id="+id,
            dataType: "JSON"
        })
          .done(function( cart, textStatus, jqXHR ) {
              resolve(cart);
          })
    });
}



////////////////////
///LOCAL TO DB
//////////////////////
var localtodb = function(id) {
    return new Promise(function(resolve) {
        $.ajax({
            type: "GET",
            url: "module/cart/controller/controller_cart.php?op=localdb&id="+id,
        })
    });
}




/////////////////
/////PUT LOCALSTORAGE (if exists) INTO DB (if user is loged)
/////////////////////
function fromlocaltodb(){
    if(localStorage.getItem('cart')){
        logedshowcart()
        .then(function(loged){
            if(loged==="true"){
                var JSONcart = JSON.parse(localStorage.getItem('cart'));

                for(var i=0; i<JSONcart.length; i++){
                    localtodb(JSONcart[i].id)
                }
                localStorage.removeItem('cart');
                localStorage.removeItem('cart2');
            }
        })
    }
}





/////////////////
/////SHOW CART
/////////////////////
function showcart(){
    logedshowcart()
    .then(function(loged){
        if(loged==="true"){
// LOGED
            cartdb()
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
                var JSONcart = JSON.parse(localStorage.getItem('cart'));

                // Meter la info de los productos en un array en localstorage
                for(var i=0; i<JSONcart.length; i++){
                    // localStorage.setItem('quantity', JSONcart[i].quantity);

                    localcart(JSONcart[i].id)
                    .then(function(cart){
                        if(!localStorage.getItem('cart2')){
                            // cart["quantity"]=localStorage.getItem('quantity');
                            
                            var arrcart2=[];
                            arrcart2.push(cart);
                            var JSONcart2 = JSON.stringify(arrcart2);

                            localStorage.setItem('cart2', JSONcart2);
                        }else{
                            // cart["quantity"]=localStorage.getItem('quantity');

                            var arrcart2 = JSON.parse(localStorage.getItem('cart2'));
                            arrcart2.push(cart);
                            var JSONcart2 = JSON.stringify(arrcart2);

                            localStorage.setItem('cart2', JSONcart2);
                        }
                    })
                }

                var cart = JSON.parse(localStorage.getItem('cart2'));

                $('.cart').empty();
                $('<div></div>').attr('id','leftcart').appendTo('.cart');
                $('<div></div>').attr('id','rightcart').appendTo('.cart');

                var showcart = "";
                var totalcart = 0;

                for(var i=0; i<cart.length; i++){
                    showcart+="<div class='cartrow'><table class='tablecart'>"+
                    "<tr><td><img class='imgcart' id='"+cart[i].idproduct+"' src='"+cart[i].img+"'/></td>"+
                    "<td><b>"+cart[i].product+" - "+cart[i].brand+"</b><br><br>"+cart[i].kg+"Kg "+cart[i].flavour+"<br>Preferred consumption: "+cart[i].datecaducity+"<br><br><b>"+cart[i].price+"€</b><br><input type='button' class='deletefromcart' id='"+cart[i].idproduct+"' value='DELETE FROM CART'/></td>"+
                    "<td><b>"+cart[i].price+"€</b><br><input type='number' class='changeq' id='"+cart[i].idproduct+"' min='1' max='99' style='width: 7em' value='1'/></td></tr>"+
                    "</table></div>";
                    
                    totalcart+=parseInt(cart[i].price);
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
            localStorage.removeItem('cart2');
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
                var arrcart = JSON.parse(localStorage['cart']);

                for(var i=0; i<arrcart.length; i++){
                    if(arrcart[i].id===id){
                        var del = i;
                        i=arrcart.length-1;
                    }
                }

                if(arrcart.length===1){
                    localStorage.removeItem('cart');
                }else{
                    arrcart.splice(del, 1);
    
                    var JSONcart = JSON.stringify(arrcart);
                    console.log(JSONcart);
                    localStorage.setItem('cart', JSONcart);
                }

                showcart();

            }
        })
    })
}





/////////////////
//////UPDATE QUANTITY
////////////////////
function quantity(){
    $('body').on("keyup", ".changeq", function() {
        var auto=$(this).val();
        var id = this.getAttribute('id');

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
                alert("YOU NEED TO LOG IN TO CONTINUE SHOPPING");
                setTimeout('window.location.href = "index.php?page=controller_login&op=list_login&needlogin=true",1000');

            }
        })
    })
    
    
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
                alert("YOU NEED TO LOG IN TO CONTINUE SHOPPING");
                setTimeout('window.location.href = "index.php?page=controller_login&op=list_login&needlogin=true",1000');
                
            }
        })
    })
}

INSERT INTO checkout SELECT * FROM cart c, (SELECT NOW() day) day WHERE c.email='hola2@gmail.com'




/////////////////
/////CHECK-OUT
///////////////////
function checkout(){
    $('body').on("click", ".finishorder", function() {
        logedshowcart()
        .then(function(loged){
            if(loged==="true"){
// CHECKOUT FOR LOGED USER
                alert("PRODUCTS PURCHASED");

                $.ajax({
                    type: "GET",
                    url: "module/cart/controller/controller_cart.php?op=checkout",
                })

            }else{
// CHECKOUT FOR NOT LOGED USER
                alert("LOG IN to purchase your order");
                setTimeout('window.location.href = "index.php?page=controller_login&op=list_login&purch=on",1000');

            }
        })
    })
}




$(document).ready(function () {

    fromlocaltodb();
    showcart();
    gotoshop();
    deletefromcart();
    quantity();
    checkout();

})