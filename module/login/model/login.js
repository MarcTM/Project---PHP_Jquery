////////////////
////FUNCTIONS VALIDATE
///////////////
function validate_user(user){
    if (user.length >= 2 && user.length <= 10) {
        return true;
    }else{
        return false;
    }
}


function validate_email(email){
    var regemail = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    if (email.length > 0) {
        var regexp = regemail;
        return regexp.test(email);
    }else{
        return false;
    }
}


function validate_pass(pass){
    if (pass.length > 5) {
        return true;
    }else{
        return false;
    }
}

////////////////
////VALIDATE LOGIN
///////////////
function validate_login(){

    var v_email=document.getElementById('email').value;
    var v_pass=document.getElementById('pass').value;


    var r_email=validate_email(v_email);
    var r_pass=validate_pass(v_pass);

    
    if(!r_email){
        document.getElementById('e_email').innerHTML = " * Ivalid email";
        return 0;
    }else{
        document.getElementById('e_email').innerHTML = "";
    }
    if(!r_pass){
        document.getElementById('e_pass').innerHTML = " * Introduce at least 6 characters";
        return 0;
    }else{
        document.getElementById('e_pass').innerHTML = "";
    }
    
    
    document.login_user.submit();
    document.login_user.action="index.php?page=controller_login&op=list_login";
}


////////////////
////VALIDATE REGISTER
///////////////
function validate_register(){

    var v_user=document.getElementById('user').value;
    var v_email=document.getElementById('email').value;
    var v_pass=document.getElementById('pass').value;

    var r_user=validate_user(v_user);
    var r_email=validate_email(v_email);
    var r_pass=validate_pass(v_pass);


    if(!r_user){
        document.getElementById('e_user').innerHTML = " * Ivalid user (between 2 and 10 characters)";
        return 0;
    }else{
        document.getElementById('e_user').innerHTML = "";
    }    
    if(!r_email){
        document.getElementById('e_email').innerHTML = " * Ivalid email";
        return 0;
    }else{
        document.getElementById('e_email').innerHTML = "";
    }
    if(!r_pass){
        document.getElementById('e_pass').innerHTML = " * Introduce at least 6 characters";
        return 0;
    }else{
        document.getElementById('e_pass').innerHTML = "";
    }   

    document.registeruser.submit();
    document.registeruser.action="index.php?page=controller_login&op=list_register";
}





////////////////
////LOGIN / REGISTER / LOGOUT
///////////////
function gotologin(){
    $('body').on("click", "#login_html", function() {
        setTimeout('window.location.href = "index.php?page=controller_login&op=list_login",1000');
    });
}

function gotoregister(){
    $('body').on("click", "#register_html", function() {
        setTimeout('window.location.href = "index.php?page=controller_login&op=list_register",1000');
    });
}

function logout(){
    $('body').on("click", "#logout_html", function() {
        setTimeout('window.location.href = "index.php?page=controller_login&op=logout",1000');
    });
}




$(document).ready(function () {

    gotologin();
    gotoregister();
    logout();

});