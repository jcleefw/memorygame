$( document ).ready(function() {
  $('#userCustomization').hide();
  $('.gameArea').hide();
  $('.winner').hide();
  console.log( "ready!" );
  intro.init();
  $('.icon-cw').on('click', function() {
    console.log("Restart was hit.");
    $('.cardArea').fadeOut().empty().delay(700).fadeIn();;
    game.restartGame();
  });
  $('.icon-pause').on('click', function() {
    console.log("Pause was hit.");
    Stopwatch.stop();
  });
});