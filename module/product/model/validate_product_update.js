
function validate_codprod(texto){
    if (texto.length > 0) {
        // var regexp = /^[a-zA-Z0-9]+$/;
        // return regexp.test($texto);
        return true;
    }
    return false;
}

function validate_datecad(texto){
    if (texto.length > 0){
        return true;
    }
    return false;
}

// function validate_brand(texto){
//     var i;
//     var ok=0;
//     for(i=0; i<texto.length;i++){
//         if(texto[i].checked){
//             ok=1
//         }
//     }
 
//     if(ok==1){
//         return true;
//     }
//     if(ok==0){
//         return false;
//     }
// }

// function validate_brand(){
//     if (document.getElementById('brand1').checked){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

// function validate_brand(texto){
//     if (texto.length==0){
//         return false;
//     }
//     else{
//         return true;
//     }
// }

function validate_kg(texto){
    if (texto.length > 0){
        var reg=/^[0-9]{1}$/;
        return reg.test(texto);
    }
    return false;
}

function validate_ingredients(array){
    var i;
    var ok=0;
    for(i=0; i<array.length;i++){
        if(array[i].checked){
            ok=1
        }
    }
 
    if(ok==1){
        return true;
    }
    if(ok==0){
        return false;
    }
}

function validate_price(texto){
    if (texto.length > 0){
        var reg=/^[0-9]{1,2}$/;
        return reg.test(texto);
    }
    return false;
}

function validate_img(texto){
    if (texto.length > 0){
        return true;
    }
    return false;
}



function validate_update(){

    var v_codprod=document.getElementById('codprod').value;
    var v_ingredients=document.getElementsByName('ingredients[]');
    // var v_brand=document.getElementsByName('brand');
    // var v_brand=document.getElementsById('brand').value;
    var v_kg=document.getElementById('kg').value;
    var v_datecad=document.getElementById('datecaducity').value;
    var v_price=document.getElementById('price').value;
    var v_img=document.getElementById('img').value;


    var r_codprod=validate_codprod(v_codprod);
    var r_ingredients=validate_ingredients(v_ingredients);
    // var r_brand=validate_brand(v_brand);
    // var r_brand=validate_brand();
    var r_kg=validate_kg(v_kg);
    var r_datecad=validate_datecad(v_datecad);
    var r_price=validate_price(v_price);
    var r_img=validate_img(v_img);

    
    if(!r_codprod){
        document.getElementById('e_codprod').innerHTML = " * Code of product not right";
        return 0;
    }else{
        document.getElementById('e_codprod').innerHTML = "";
    }
    if(!r_ingredients){
        document.getElementById('e_ingredients').innerHTML = " * Introduce at least 1 ingredient";
        return 0;
    }else{
        document.getElementById('e_ingredients').innerHTML = "";
    }
    // if(!r_brand){
    //     document.getElementById('e_brand').innerHTML = " * You have to introduce a brand";
    //     return 0;
    // }else{
    //     document.getElementById('e_brand').innerHTML = "";
    // }
    if(!r_kg){
        document.getElementById('e_kg').innerHTML = " * KG not correct ";
        return 0;
    }else{
        document.getElementById('e_kg').innerHTML = "";
    }
    if(!r_datecad){
        document.getElementById('e_datecaducity').innerHTML = " * You have to introduce a date";
        // document.alta_product.datecaducity.focus();
        return 0;
    }else{
        document.getElementById('e_datecaducity').innerHTML = "";
    }
    if(!r_price){
        document.getElementById('e_price').innerHTML = " * Price not correct ";
        return 0;
    }else{
        document.getElementById('e_price').innerHTML = "";
    }
    if(!r_img){
        document.getElementById('e_img').innerHTML = " * Enter a valid url ";
        return 0;
    }else{
        document.getElementById('e_img').innerHTML = "";
    }
    
    document.update_product.submit();
    document.update_product.action="index.php?page=controller_products&op=update";
}