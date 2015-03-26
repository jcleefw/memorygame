var player = {
  //player1: { name: '', score: 0, totalRoundWin: 0 },
  //player2: { name: '', score: 0, totalRoundWin: 0 },
  displayWinner: function() {
    if(player.player1.score > player.player2.score) {
      winner = "Player 1 wins" ;
      this.player1.totalRoundWin++;
    } else if (player.player2.score > player.player1.score) {
      winner = "Player 2 wins";
      this.player2.totalRoundWin++;
    }else {
      winner = "Draw. No one wins";
    }

    $('div.cardArea').hide();
    $('div.winner').prepend($('<p class="message">').text(winner)).show();
  },
  createPlayer: function(numPlayer) {
    console.log("Create " + numPlayer + " player(s)");
    _.times(numPlayer, function(index) {
      console.log(index);
      var name = "player" + (index+1);
      console.log(name);
      player[name] = { 'name': '', 'score': 0, 'totalRoundWin': 0 };
    });
  },
}
