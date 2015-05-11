// create a temp array to hold variety of symbols for game
var tempArray = ["@","$","%","&","*","#","+","="];

var game = {
  config: function() {
    //this.pairs = 4; // 4 x 2 = 8 cards
    this.clickValue = [];
    this.clickIndex = [];
    this.pairsFound = 0;
    this.playerTurn = 0;
  },

  setUpGameArray: function() {

    if(this.pairs === undefined) {
      this.pairs = 4;
    }
    // select the number of symbols needed for the game
    if(this.pairs > tempArray.length) {
      var repeat = Math.floor(this.pairs / tempArray.length);
      var leftover = this.pairs % tempArray.length
      var repeatArray = [];
      var leftover_array = tempArray.slice(0, leftover);

      _.times(repeat, function() {
        repeatArray = tempArray.slice(0, tempArray.length).concat(repeatArray);
      });
      //debugger;
      newArray = repeatArray.concat(leftover_array);
    } else {
      var newArray = tempArray.slice(0, this.pairs);
    }


    //duplicate the array so that the value are a pair
    newArray = newArray.concat(newArray);
    // shuffle the array
    newArray = _.shuffle(newArray);

    return newArray;
  },
  // Setup the screen with the card deck
  setUpDisplay: function(numOfPlayers) {
    console.log("setUpDisplay")
    game.config();
    var gameArray = this.setUpGameArray();
    console.log("gameArray" + gameArray);
    var length = gameArray.length;

    var counter=0;
    $('.cardArea').append('<ul>');

    // loop through the number of cards for the game and add element to html
    _.times((game.pairs*2), function(index) {
      console.log("inside _.times setup game.pairs");
      var $frontDiv = $('<div>').addClass('face front');
      var $backDiv = $('<div>').addClass('face back').text(gameArray[counter]);
      var listItem = $('<li>').addClass('card').append($frontDiv).append($backDiv);

      $('ul').append(listItem);
      counter++;
    });
    this.setUpEventListener($('.card'));
    this.setHeaderDisplay(numOfPlayers);
    // Display which player's turn
    if(numOfPlayers==='double') {
      if(this.playerTurn<1) {
        $('#playerTurn').text(player.player1.name);
      } else{
        $('#playerTurn').text(player.player2.name);
      }
    }
    if(!this.gameType) {
      this.gameType = numOfPlayers;
    }


  },
  setHeaderDisplay: function(type) {
    if(type === 'single') {
      console.log("set up single player header");
      var playerName = player.player1.name;

      // $spanName = $('<span>').addClass('playerTurn').text(playerName);
      //$message = $('<div>').addClass('turn').text('Welcome, ').append($spanName);
      $message = $('<div>').addClass('turn').text('Welcome, ');
      $score = $('<p>').append($('<em>').text('Pairs Found: ')).append($('<spans id="player1">').text(player.player1.score));
      //$('.playerScore article').first().prepend($message);

      $('.playerScore article').last().hide();
      $('.playerScore .empire').css('float', 'right');

      //$('.playerScore').empty();
    } else if (type === 'double') {
      console.log("set up double player header");
      //$spanTurn = $('<span>').attr('id', 'playerTurn');
      //$divTurn = $('<div>').addClass('turn').append($spanTurn).append($('<em>').text(' turn'));
      //$('.playerInfo').prepend($divTurn);

      $('#ply2Name').text(player.player2.name);
    }
    $('#ply1Name').text(player.player1.name);
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
        if(this.gameType !== 'single') {
          this.updatePlayerScore(false, this.playerTurn);
        } else {

          this.updatePlayerScore(false, this.playerTurn);
        }

        this.toggleCardEvent();
      }

      // then clear both value and index array
      this.clickValue = [];
      this.clickIndex = [];
      return true;
    } else {
      return false;
    }


  },
  toggleCardEvent: function() {
    console.log(game.clickIndex);
    console.log("length =" +game.clickIndex.length);
    _.times(game.clickIndex.length, function(index) {
      var clickIndex = game.clickIndex[index];
      console.log(clickIndex);
      //$('ul li.card:nth-child('+clickIndex+')').off('click');
      game.offCardEvent(clickIndex);
    });
  },
  offCardEvent: function(cardIndex) {
    $('.card:nth-child('+(cardIndex+1)+')').off('click');
  },
  compareStoreValue: function() {

    var length = _.uniq(game.clickValue).length;

    // if both value are the same then return true to indicate it's the same
    return (length===1) ? true : false;
  },
  hideCards: function() {
    var indexToChange = this.clickIndex;

    _.times(indexToChange.length, function(index) {
      console.log($( 'ul li:nth-child('+(indexToChange[index]+1)+')' ));
        game.setUpEventListener($( 'ul li:nth-child('+(indexToChange[index]+1)+')' ));
      $( 'ul li:nth-child('+(indexToChange[index]+1)+')' ).removeClass('flipped');
    });
    if(this.gameType !== 'single') {
      $('#playerTurn').text(this.changePlayer());
    }
  },
  changePlayer:function() {

    if(this.playerTurn) {
      this.playerTurn = 0;
      return player.player1.name
    }else {
      this.playerTurn = 1;
      return player.player2.name
    }

  },
  updatePlayerScore: function(reset, playerTurn ) {
    console.log(player.player1.score);

    if(reset === true) {
      player.player1.score = 0;
      $('#player1').text(player.player1.score);
      if(game.gameType === 'double') {
        player.player2.score = 0;
        $('#player2').text(player.player2.score);
      }

    } else {
      //console.log('this is not reset');
      if(!playerTurn) {
        //console.log('player 1 scores');
        player.player1.score++;
        $('#player1').text(player.player1.score);
      }else {
        //console.log('player 2 scores');
        player.player2.score++;
        $('#player2').text(player.player2.score);
      }
      this.pairsFound += 1;
      this.checkWin();
    }

  },
  checkWin: function () {
    console.log('checkWin');
    console.log("pairsFound=" + this.pairsFound);
    console.log("thisPairs=" + this.pairs);
    var winner;
    if(this.pairsFound===this.pairs) {
      player.displayWinner();
      $('.winner').show();
      return true;
    } else {
      return false;
    }
  },
  setUpEventListener: function(elem) {
    console.log("setUpEventListener");
    elem.on('click', function() {
      console.log("setUpEventListener click");
      // Stopwatch.init();
      //console.log($(this).parent().index());
      console.log($(this));
      var liIndex = $(this).index();
      var elem = $(this);
      $(this).addClass('flipped');
      _.delay(function() {
        //console.log(elem);
        game.offCardEvent(liIndex);
        game.storeClickValue(elem.html(), liIndex)
      },600);
    });

  },
  restartGame: function() {
    //this.playerTurn = 0;
    game.updatePlayerScore(true);
    // Stopwatch.stop();
    // Stopwatch.clear();
    game.setUpDisplay();
    $('.winner').hide();
    //game.pairsFound = 0;
    game.config();

    //$('.stopwatch').text('00:00:00');
  }
}

