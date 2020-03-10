function changeIdiom(lang) {
  //  lang = lang || localStorage.getItem('app-lang') || 'en';
   localStorage.setItem('app-lang', lang);
 
   $.ajax({
     url: 'view/lang/'+lang+'.json',
     type: 'POST',
     dataType: 'JSON',
     success: function (data) {
       var elems = document.querySelectorAll('[data-tr]');
       for (var x = 0; x < elems.length; x++) {
        //  if (data){
           elems[x].innerHTML = data[lang][elems[x].dataset.tr];
        //  }
        //  else{
        //    elems[x].innerHTML = elems[x].dataset.tr;
        //  }
       }
     }
   });  
}


$(document).ready(function() {
  changeIdiom(localStorage.getItem('app-lang'));
  var elems = document.querySelectorAll('[data-tr]');
  $('#idiom').on("change", function() {
    if ($(this).val() == "es"){
      changeIdiom('es');   
    }
    else if ($(this).val() == "en"){
      changeIdiom('en');
    }
    else if ($(this).val() == "va"){
     changeIdiom('va');
    }
  });
});
