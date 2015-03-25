// create a temp array to hold variety of symbols for game
var tempArray = ["@","$","%","&","*","#","+","="];
var game = {
  pairs: 4, // 4 x 2 = 8 cards
  clickValue: [],
  clickIndex: [],
  pairsFound: 0,
  player1: 0,
  player2: 0,
  playerTurn: 0,
  setUpGameArray: function() {
    // select the number of symbols needed for the game
    var newArray = tempArray.slice(0, this.pairs);
    //duplicate the array so that the value are a pair
    newArray = newArray.concat(newArray);
    // shuffle the array 3 times
    newArray = _.shuffle(newArray);
    return newArray;
  },
  // Setup the screen with the card deck
  setUpDisplay: function() {
    var gameArray = this.setUpGameArray();

    var length = gameArray.length;
    
    var counter=0;
    $('.cardArea').append('<ul>');
    // loop through the number of cards for the game and add element to html
    _.times((game.pairs*2), function(index) {
      //console.log(gameArray[counter]);
      $('ul').append($('<li class="card">').append($('<p class="hide">').text(gameArray[counter])));
      counter++;
    });

    // Display which player's turn
    $('#playerTurn').text(this.playerTurn+1);
  },
  storeClickValue: function(value, index) {
    
    // add the value of the element clicked into array 
    this.clickValue.push(value);

    // add the index of the element clicked into array 
    this.clickIndex.push(index);

    // if click value array has 2 value
    if(this.clickValue.length > 1) {
      // compare the 2 value to check whether it's the same
      var same = this.compareStoreValue();

      // if not the same, hide flip and hide the cards
      if(!same) { 
        this.hideCards(); 
      
      // else update player score  
      } else {
        this.updatePlayerScore(this.playerTurn);
      }

      // then clear bothe value and index array
      this.clickValue = [];
      this.clickIndex = [];
      return true;
    } else {
      return false;
    }
    
    
  },
  compareStoreValue: function() {

    var length = _.uniq(game.clickValue).length;

    // if both value are the same then return true to indicate it's the same
    return (length===1) ? true : false;
  },
  hideCards: function() {
    var indexToChange = this.clickIndex; 
    _.times(indexToChange.length, function(index) {
      $( 'ul li:nth-child('+(indexToChange[index]+1)+') p' ).toggleClass('hide');
    });
    $('#playerTurn').text(this.changePlayer()+1);
    
  },
  changePlayer:function() {
    return (this.playerTurn) ? this.playerTurn = 0 : this.playerTurn = 1;
  },
  updatePlayerScore: function(player) {
    if(!player) {
      this.player1++;
      $('#player1').text(this.player1);
    }else {
      this.player2++;
      $('#player2').text(this.player2);
    }
    this.pairsFound += 1;
    this.checkWin();
  },
  checkWin: function () {
    console.log("pairsFound=" + this.pairsFound);
    var winner;
    if(this.pairsFound===4) {
      if(this.player1 > this.player2) {
        winner = "Player 1 wins" ;
      } else if (this.player2 > this.player1) {
        winner = "Player 2 wins";
      }else {
        winner = "Draw. No one wins";
      }
      $('div.cardArea').hide();
      $('div.winner').prepend($('<p class="winner">').text(winner));
      return true;
    } else {
      return false;
    }
    
  }
}

$( document ).ready(function() {
    console.log( "ready!" );
    game.setUpDisplay();

    $('.card').on('click', 'p', function() {
      //console.log($(this).parent().index());
      var liIndex = $(this).parent().index();
      var elem = $(this);
      $(this).toggleClass('hide');
      _.delay(function() {
        //console.log(elem);
        game.storeClickValue(elem.html(), liIndex)
      },600);
    });
    $('button').on('click', function() {
      $('div.cardArea').empty().show();
      game.setUpDisplay();
      //$('div.cardArea').show();
    });
});