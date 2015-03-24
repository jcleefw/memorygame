// create a temp array to hold variety of symbols for game
var tempArray = ["@","$","%","&","*","#","+","="];
var game = {
  pairs: 4, // 4 x 2 = 8 cards
  setUpGameArray: function() {
    // select the number of symbols needed for the game
    var newArray = tempArray.slice(0, this.pairs);
    //duplicate the array so that the value are a pair
    newArray = newArray.concat(newArray);
    // shuffle the array 3 times
    newArray = _.shuffle(newArray);
    return newArray;
  },
  setUpRow: function() {
    // based on number of pairs, set up the number of roles needed
    var row = Math.round(this.pairs / 2); 
    _.times(row, function(index) {
      $('.cardArea').append($('<ul>').addClass('row'+index));
    });
    return row;
  },
  setUpDisplay: function() {
    var gameArray = this.setUpGameArray();

    var length = gameArray.length;
    var row = this.setUpRow();
    var counter=0;
    console.log(row);
    _.times(row, function (index) {
      console.log('row' + index);
      var rowName= '.row'+index;
      console.log(game.pairs);
      _.times(game.pairs, function(index) {
        //console.log(gameArray[counter]);
        $(rowName).append($('<li class="card">').append($('<p class="hide">').text(gameArray[counter])));
        counter++;
      });
    });
  }
}

$( document ).ready(function() {
    console.log( "ready!" );
    game.setUpDisplay();

    $('.card').on('click', 'p', function() {
      console.log($(this).html());
      $(this).toggleClass('hide');
    });
});