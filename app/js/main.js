$(function () {
  $('.top-slider__inner').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000,
  })
  $(".video-fashion__path").bind("webkitAnimationEnd mozAnimationEnd animationend", function(){
    $(this).removeClass("animated")  
  })
  $(".video-fashion__svg").hover(function(){
    $(".video-fashion__path").addClass("animated");        
  })

  $(".star").rateYo({
    starWidth: "17px",
    ratedFill: "#ffc35b",
    normalFill: "#ccccce",
    readOnly:true
  });
});