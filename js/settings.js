_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

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
    /*<div class="playerName">
        <p class="playerContainer">
          <label for="ply1">Player 1 Name: </label>
          <input type="text" id="ply1">
        </p>
      </div>*/
      var htmlMaker = _.template('<div class="playerName"><p class="playerContainer"><label for="ply{{playerIndex}}">Player {{playerIndex}} Name: </label><input type="text" id="ply{{playerIndex}}"></p></div>');
      var template = htmlMaker({playerIndex: index});

    if ($("div.playerName").length > 0){
      $("div.playerName").append(template);
    } else {
      $('.userSettings').prepend(template);
    }
  },
  createEventListener: function() {
    $('#userCustomization').on('click', 'button', function() {
      var buttonClick = $(this).attr('id');
      var noOfInput = $(this).parent().find('input').length;
      var input = $(this).closest('section').find($('input[type=text]'));

      var playerName = [];

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

    $("#cardRange").change(function () {
      console.log("Card Range is changing");
      var newValue = $('#cardRange').val();
      console.log("newValue =" + newValue);
      $("#cardsNo").text(newValue);
      game.pairs = newValue/2;
    });
  },

}