var intro = {

  init: function () {
    this.createEventListener();
  },

  //create event listener
  createEventListener: function() {

    $('#intro').on('click', 'button', function() {
      if($(this).attr('id') === "singlePlayer") {
        player.createPlayer(1);
      } else if ($(this).attr('id') === "doublePlayer"){
        player.createPlayer(2);
      }
      $(this).closest('section').fadeOut(500, function() {
        $(this).remove();
      });

    });
  }
}

var settings = {
  init: function(num) {
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
      $('#userCustomization').prepend($playerNameDiv);
    }
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

    // $("#cardRange").change(function () {
    //   console.log("Card Range is changing");
    //   var newValue = $('#cardRange').val();
    //   console.log("newValue =" + newValue);
    //   $("#cardsNo").text(newValue);
    // });
  }
}

