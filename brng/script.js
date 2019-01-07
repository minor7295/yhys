(function ($) {
// define variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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

$('.play').click(function() {  // play 버튼 눌렀을 때
  $('#menu').hide();
});
$('.restart').click(function() {  // restart 버튼 눌렀을 때
  $('#game-over').hide();
});


function startGame(){

}

})(jQuery);