// create a temp array to hold variety of symbols for game
var tempArray = ["@","$","%","&","*","#","+","="];

var game = {
  pairs: 4, // 4 x 2 = 8 cards
  clickValue: [],
  clickIndex: [],
  pairsFound: 0,
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
    $('div.winner').hide();
    var gameArray = this.setUpGameArray();

    var length = gameArray.length;
    
    var counter=0;
    $('.cardArea').append('<ul>');

    
    // loop through the number of cards for the game and add element to html
    _.times((game.pairs*2), function(index) {
      var $frontDiv = $('<div>').addClass('face front');
      var $backDiv = $('<div>').addClass('face back').text(gameArray[counter]);
      var listItem = $('<li>').addClass('card').append($frontDiv).append($backDiv);

      //$('ul').append($('<li class="card"><div class="face front">').append($('<div class="face back">').text(gameArray[counter])));
      $('ul').append(listItem);
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

      // then clear both value and index array
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
      $( 'ul li:nth-child('+(indexToChange[index]+1)+')' ).removeClass('flipped');
    });
    $('#playerTurn').text(this.changePlayer()+1);
    
  },
  changePlayer:function() {
    return (this.playerTurn) ? this.playerTurn = 0 : this.playerTurn = 1;
  },
  updatePlayerScore: function(playerTurn) {
    console.log(player.player1.score);
    if(!playerTurn) {
      player.player1.score++;
      $('#player1').text(player.player1.score);
    }else {
      player.player2.score++;
      $('#player2').text(player.player2.score);
    }
    this.pairsFound += 1;
    this.checkWin();
  },
  checkWin: function () {
    console.log("pairsFound=" + this.pairsFound);
    var winner;
    if(this.pairsFound===this.pairs) {
      player.displayWinner();
      return true;
    } else {
      return false;
    }
  }
}

$( document ).ready(function() {
    console.log( "ready!" );
    intro.init();
    game.setUpDisplay();
    $('#startPlay').on('click', function() {
      $('#intro').fadeOut().remove();
      $('.gameArea').delay(600).fadeIn();
    });

    $('.card').on('click', function() {
      //console.log($(this).parent().index());
      var liIndex = $(this).index();
      var elem = $(this);
      $(this).addClass('flipped');
      _.delay(function() {
        //console.log(elem);
        game.storeClickValue(elem.html(), liIndex)
      },600);
    });

    //restart button
    $('button').on('click', function() {
      $('div.cardArea').empty().show();
      game.setUpDisplay();
      //$('div.cardArea').show();
    });

});