(function ($) { // jQuery 영역
  
/**
 * Click handlers for the different menu screens
 */
$('.manual').click(function() { // manual 버튼 눌렀을 때
  $('#main').hide();
  $('#manual').show();
  $('#menu').addClass('manual');
});
$('.back').click(function() { // manual 창에서 back버튼 눌렀을 때
  $('#manual').hide();
  $('#main').show();
  $('#menu').removeClass('manual');
});

})(jQuery);