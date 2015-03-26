var intro = {
  init: function () {
    $introDiv = $('<div>').addClass('fullscreen').attr('id', 'intro');
    //$introSpan = $('<i>').addClass("icon-play").attr('id', 'startPlay');
    $singlePlayerButton = $('<button>').attr('id', 'singlePlayer').text('Single Player');
    $doublePlayerButton = $('<button>').attr('id', 'doublePlayer').text('Double Player');
    $('main.container').prepend($introDiv);
    $('#intro').append($singlePlayerButton).append($doublePlayerButton);

    this.createEventListener();
  },
  createEventListener: function() {
    $('#singlePlayer').on('click', function() {
      $('#intro').fadeOut().remove();
      player.createPlayer(1);
      game.setUpDisplay('single');
      $('.gameArea').delay(600).fadeIn();
    });
    $('#doublePlayer').on('click', function() {
      $('#intro').fadeOut().remove();
      player.createPlayer(2);
      game.setUpDisplay('double');
      $('.gameArea').delay(600).fadeIn();
    });
  }
}

