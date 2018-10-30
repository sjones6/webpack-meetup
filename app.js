$('body').append('<h1 id="title">Yay, JQuery! <span id="colors"></span></h1>');

$('body').append('<button>Cycle Colors</button')

function getRandom() {
  return Math.floor((Math.random() * 255))
}

var int
$('button').on('click', function() {
  if (int) {
    clearInterval(int);
    $('#title').css({color: '#000'})
    int = null;
    return;
  }

  int = window.setInterval(function() {
    var color = 'rgb(' + [
      getRandom(),
      getRandom(),
      getRandom()
    ].join(', ') + ')'
    $('#colors').text(color)
    $('#title').css({ color: color })
  }, 250);
})
