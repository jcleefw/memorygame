var intro = {

  init: function () {
    this.createEventListener();
  },

  //create event listener
  createEventListener: function() {

    $('#intro').on('click', 'button', function() {
      if($(this).attr('id') === "singlePlayer") {
        player.createPlayer(1);
      } else if ($(this).attr('id') === "doublePlayer"){
        player.createPlayer(2);
      }
      $(this).closest('section').fadeOut(500, function() {
        $(this).remove();
      });

    });
  }
}

