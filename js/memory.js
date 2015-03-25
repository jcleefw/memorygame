// create a temp array to hold variety of symbols for game
var tempArray = ["@","$","%","&","*","#","+","="];
var game = {
  pairs: 4, // 4 x 2 = 8 cards
  clickValue: [],
  clickIndex: [],
  player1: 0,
  player2: 0,
  playerTurn: '',
  setUpGameArray: function() {
    // select the number of symbols needed for the game
    var newArray = tempArray.slice(0, this.pairs);
    //duplicate the array so that the value are a pair
    newArray = newArray.concat(newArray);
    // shuffle the array 3 times
    newArray = _.shuffle(newArray);
    return newArray;
  },
  // setUpRow: function() {
  //   // based on number of pairs, set up the number of roles needed
  //   var row = Math.round(this.pairs / 2); 
  //   _.times(row, function(index) {
  //     $('.cardArea').append($('<ul>').addClass('row'+index));
  //   });
  //   return row;
  // },
  setUpDisplay: function() {
    var gameArray = this.setUpGameArray();

    var length = gameArray.length;
    
    var counter=0;

    _.times((game.pairs*2), function(index) {
      //console.log(gameArray[counter]);
      $('ul').append($('<li class="card">').append($('<p class="hide">').text(gameArray[counter])));
      counter++;
    });
  },
  storeClickValue: function(value, index) {
    console.log(value);
    this.clickValue.push(value);
    this.clickIndex.push(index);
    if(this.clickValue.length > 1) {
      var same = this.compareStoreValue();
      if(!same) { this.changeDisplay(); }
      this.clickValue = [];
      this.clickIndex = [];
      return true;
    } else {
      return false;
    }
  },
  compareStoreValue: function() {
    var length = _.uniq(game.clickValue).length;

    return (length===1) ? true : false;
  },
  changeDisplay: function() {
    var indexToChange = this.clickIndex; 
    _.times(indexToChange.length, function(index) {
      $( 'ul li:nth-child('+(indexToChange[index]+1)+') p' ).toggleClass('hide');
    });
  },
  changePlayer:function() {
    return (playerTurn) ? 0 : 1;
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
});