var intro = {
  init: function () {
    $introDiv = $('<div>').addClass('fullscreen').attr('id', 'intro');
    $introSpan = $('<span>').addClass("icon-play3").attr('id', 'startPlay');
    $('main.container').prepend($introDiv);
    $('#intro').append($introSpan);
  }
}