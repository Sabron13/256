$(document).ready(function() {
  var gameOne = new Game('2000020000200002');
  gameOne.toString();

  Mousetrap.bind('up', function() { gameOne.moveUp() });
  Mousetrap.bind('right', function() { gameOne.moveRight() });
  Mousetrap.bind('down', function() { gameOne.moveDown() });
  Mousetrap.bind('left', function() { gameOne.moveLeft() });
});
