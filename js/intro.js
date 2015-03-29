var intro = {
  init: function () {
    // $introDiv = $('<div>').addClass('fullscreen').attr('id', 'intro');
    // //$introSpan = $('<i>').addClass("icon-play").attr('id', 'startPlay');
    // $singlePlayerButton = $('<button>').attr('id', 'singlePlayer').text('Single Player');
    // $doublePlayerButton = $('<button>').attr('id', 'doublePlayer').text('Double Player');
    // $('main.container').prepend($introDiv);
    // $('#intro').append($singlePlayerButton).append($doublePlayerButton);

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
    console.log('Settings.init numPlayer = ' + num);
    $('#userCustomization').fadeIn(600);
    _.times(num, function(index) {
      settings.createPlayerNameDiv((index+1));
    });
    
    this.createEventListener();
  },
  createPlayerNameDiv: function (index) {
    $label = $('<label>').attr('for', 'ply'+index).text('Player '+index+' Name: ');
    $input = $('<input>').attr({type: 'text', id: 'ply'+index});
    
    
    $container = $('<p>').addClass('playerContainer').append($label).append($input);
    $playerNameDiv = $('<div>').addClass('playerName').append($container);
    if ($("div.playerName").length > 0){
      $playerNameDiv.insertAfter($("div.playerName"));
    } else {
      $('.userSettings').prepend($playerNameDiv);
    }
  },
  createEventListener: function() {
    $('#userCustomization').on('click', 'button', function() {
      var buttonClick = $(this).attr('id');
      //console.log("button Click =" + buttonClick);
      //console.log("$(this) = " + $(this).attr('id'));
      var noOfInput = $(this).parent().find('input').length;
      var input = $(this).closest('section').find($('input[type=text]'));
      //console.log("input =" + input);
      var playerName = [];
      //var listItems = $("#productList li");
      input.each(function(idx, li) {
          var name = $(li);
          playerName.push(name.val());
      });
      player.assignPlayerName(playerName, buttonClick);
      console.log("Settings Create Event Listener, PlayerName.length = " + playerName.length);  
      (playerName.length>1) ? game.setUpDisplay('double') : game.setUpDisplay('single');
      
      $(this).closest('section').fadeOut(1000, function() {
        $('.gameArea').fadeIn(600);
      });
    });

    // $("#cardRange").change(function () {         
    //   console.log("Card Range is changing");
    //   var newValue = $('#cardRange').val();
    //   console.log("newValue =" + newValue);
    //   $("#cardsNo").text(newValue);
    // });
  },
  
}