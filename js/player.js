var player = {
  //player1: { name: '', score: 0, totalRoundWin: 0 },
  //player2: { name: '', score: 0, totalRoundWin: 0 },
  displayWinner: function() {
    if(game.gameType !== 'single') {
      if(player.player1.score > player.player2.score) {
        winner = "Congratulations, " + this.player1.name + " wins" ;
        this.player1.totalRoundWin++;
      } else if (player.player2.score > player.player1.score) {
        winner = "Congratulations, " + this.player2.name + " wins" ;
        this.player2.totalRoundWin++;
      }else {
        winner = "Oh! Oh! Draw. No one wins";
      }
    } else {
      winner = "Congratulations. You've finish the game";
    }
    

    $('div.cardArea').hide();
    $('div.winner').prepend($('<p class="message">').text(winner)).show();
    Stopwatch.stop();
  },
  createPlayer: function(numPlayer) {
    console.log("Create " + numPlayer + " player(s)");
    _.times(numPlayer, function(index) {
      //console.log(index);
      var name = "player" + (index+1);
      //console.log(name);
      player[name] = { 'name': '', 'score': 0, 'totalRoundWin': 0 };
    });
    settings.init(numPlayer);
  },
  assignPlayerName: function(array, btn) {
    //console.log(array);
    //console.log(btn);
    if(btn==="startPlay") {
      _.times(array.length, function (index) {
        //console.log(array[index]);
        var playerNo = "player"+(index+1);
        console.log(playerNo+"name = " + array[index]);
        if(array[index]) {
          player[playerNo].name = array[index];
        } else {
          player.setDefaultPlayerName((index+1));
        }
        
      });
    } else {
      player.setDefaultPlayerName(1);
      player.setDefaultPlayerName(2);
    }

    //return array.length;
  },
  setDefaultPlayerName: function(num) {
    return player["player"+num].name = "Player " + num;
  }
}
