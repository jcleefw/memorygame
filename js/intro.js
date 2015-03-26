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
      $('#intro').fadeOut(1000, function() {
        player.createPlayer(1);
        $(this).remove();
      });
      
      //game.setUpDisplay('single');
    });
    $('#doublePlayer').on('click', function() {
      $('#intro').fadeOut(1000, function() {
        player.createPlayer(2);
        $(this).remove();
      });
      //game.setUpDisplay('double');
    });
  }
}

var settings = {
  init: function(num) {
    $buttonStart = $('<button>').attr('id', 'startPlay').text('Start');
    $buttonSkip = $('<button>').attr('id', 'skip').text('Skip');
    $settingsDiv = $('<div>').addClass('fullscreen').attr('id', 'userCustomization');

    $('main.container').prepend($settingsDiv.fadeIn(600));
    _.times(num, function(index) {
      settings.createPlayerNameDiv((index+1));
    });
    $('#userCustomization').append($buttonStart).append($buttonSkip);
    this.createEventListener();
  },
  createPlayerNameDiv: function (index) {
    $label = $('<label>').attr('for', 'ply'+index).text('Player '+index+' Name: ');
    $input = $('<input>').attr({type: 'text', id: 'ply'+index});
    
    
    $container = $('<p>').addClass('playerContainer').append($label).append($input);
    $playerNameDiv = $('<div>').addClass('playerName').append($container);
    $('#userCustomization').append($playerNameDiv);
  },
  createEventListener: function() {
    $('#userCustomization').on('click', 'button', function() {
      var buttonClick = $(this).attr('id');
      console.log(buttonClick);
      var noOfInput = $(this).parent().find('input').length;
      var input = $(this).parent().find('input');
      var playerName = [];
      //var listItems = $("#productList li");
      input.each(function(idx, li) {
          var name = $(li);
          playerName.push(name.val());
      });
      player.assignPlayerName(playerName, buttonClick);
      console.log(playerName.length);  
      (playerName.length>1) ? game.setUpDisplay('double') : game.setUpDisplay('single');
      
      $(this).parent().fadeOut(1000, function() {
        $('.gameArea').fadeIn(600);
        $(this).remove();
      });
      
    });
  }
}