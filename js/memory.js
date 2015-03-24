// create a temp array to hold variety of symbols for game
var tempArray = ["a","b","c","d","e","f","g","h"];
var game = {
  pairs: 4,
  setUpGame: function() {
    var newArray = tempArray.slice(0, this.pairs);
  }
}

$( document ).ready(function() {
    console.log( "ready!" );
});