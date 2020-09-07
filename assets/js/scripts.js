
$(window).on('load', function() {
    $("#loader").fadeOut("slow", function(){
        $("#preloader").delay(300).fadeOut("slow");
    });

});
        var video = document.getElementById("my-video");

        video.addEventListener( "canplay", function() {
            video.play();
        });


          $(document).ready(function(){
            $('.owl-carousel').owlCarousel({
                  loop:true,
                  margin:10,
                  nav:false,
                  dots: false,
                  items:6,
                  autoplay:true,
                  autoplayTimeout:10000
                  /*responsive:{
                      0:{
                          items:1
                      },
                      600:{
                          items:3
                      },
                      1000:{
                          items:6
                      }
                  }*/
                })
          });
