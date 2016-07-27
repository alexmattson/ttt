const View = require('./ttt-view.js');
const Game = require('./game.js');

$( () => {
  let $el = $('.ttt');
  let game = new Game();
  let gameView = new View(game, $el);
});
