////////////////////////
///// SET clicks and movements when document is ready
/////////////////
function startvariables(){
    clicks = 0;
    localStorage.setItem('clicks', clicks);

    movements = 0;
    localStorage.setItem('movements', movements);
}





////////////////////////
///// REGENERATE TIME when you go to other page
/////////////////
function regenerate_time(){
    $.ajax({
        type : 'GET',
        url  : 'module/login/controller/controller_login.php?&op=regenerate_time',
    });
}




////////////////////////
///// EXPIRE SESSION if no activity AND REGENERATE SESSION ID
/////////////////
var promiseexpire = function() {
    return new Promise(function(resolve, reject) {
     $.ajax({ 
              type: 'GET', 
              url: "module/login/controller/controller_login.php?&op=activity", 
          })
          .done(function( active, textStatus, jqXHR ) {
              resolve(active);
          })
    });
}

function expiresession(){
    setInterval(function(){
        promiseexpire()
        .then(function (active){
                if(active==="inactive"){
                    alert("Your session has expired due to inactivity")
                    setTimeout('window.location.href = "index.php?page=controller_login&op=logout";',1000);
                }
        })
    }, 30000); //Check every 30 seconds
}





////////////////////////
///// EXPIRE SESSION when no clicks detected
/////////////////
var promiseclick = function() {
    return new Promise(function(resolve, reject) {
     $.ajax({ 
              type: 'GET', 
              url: "module/login/controller/controller_login.php?&op=checksession", 
          })
          .done(function( session, textStatus, jqXHR ) {
              resolve(session);
          })
    });
}

function detect_click(){
    $('body').on('click', function( event ) {
        clicks += 1;
    });

    setInterval(function(){
        promiseclick()
        .then(function (session){
            if(session==="s"){
                if(clicks > localStorage.getItem('clicks')){
                    localStorage.setItem('clicks', clicks);
                    console.log(clicks);
                    regenerate_time();
                }else{
                    alert("Your session has expired due to inactivity")
                    setTimeout('window.location.href = "index.php?page=controller_login&op=logout";',1000);
                }
            }
        })
    }, 300000); //Check every 5 minutes
}




////////////////////////
///// EXPIRE SESSION when no cursor movement detected
/////////////////
var promisemovement = function() {
    return new Promise(function(resolve, reject) {
     $.ajax({ 
              type: 'GET', 
              url: "module/login/controller/controller_login.php?&op=checksession", 
          })
          .done(function( session, textStatus, jqXHR ) {
              resolve(session);
          })
    });
}

function detect_movement(){
    $('body').mousemove(function( event ) {
        movements += 1;
    });

    setInterval(function(){
        promisemovement()
        .then(function (session){
            if(session==="s"){
                if(movements > localStorage.getItem('movements')){
                    localStorage.setItem('movements', movements);
                    console.log(movements);
                    regenerate_time();
                }else{
                    alert("Your session has expired due to inactivity")
                    setTimeout('window.location.href = "index.php?page=controller_login&op=logout";',1000);
                }
            }
        })
    }, 300000); //Check every 5 minutes
}





$(document).ready(function () {

    startvariables();

    regenerate_time();
    expiresession();
    detect_click();
    detect_movement();
      
});