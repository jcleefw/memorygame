var player = {
  player1: { name: '', score: 0, totalRoundWin: 0 },
  player2: { name: '', score: 0, totalRoundWin: 0 },
  displayWinner: function() {
    if(player.player1.score > player.player2.score) {
      winner = "Player 1 wins" ;
    } else if (player.player2.score > player.player1.score) {
      winner = "Player 2 wins";
    }else {
      winner = "Draw. No one wins";
    }

    $('div.cardArea').hide();
    $('div.winner').prepend($('<p class="message">').text(winner)).show();
  }
}
