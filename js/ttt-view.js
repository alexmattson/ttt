var View = function View(game, $el) {
  this.game = game;
  this.$el = $el;
  this.enabled = true;

  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  let $listItems = $("li");
  let thisView = this;
  $listItems.each((idx, cell) => {
    $(cell).click(function(event) {
      if (thisView.enabled) {
        event.preventDefault();

        let $currentTarget = $(event.currentTarget);
        thisView.makeMove($currentTarget);
      }
    });
  });
};

View.prototype.makeMove = function ($square) {
  let thisView = this;
  try {
    let strPos = $square.attr("pos");
    let pos = Array.from(strPos).map((el) => parseInt(el));
    let mark = thisView.game.currentPlayer;

    thisView.game.playMove(pos);
    $square.addClass("selected");
    $square.text(`${mark}`);

    if (thisView.game.isOver()) {
      let $body = $('body');
      let $winner = $(`<h2>${thisView.game.winner()} is the winner!</h2>`);
      $body.append($winner);
      thisView.enabled = false;
    }
  }
  catch (err) {
    alert('That is not an empty position!');
  }
};

View.prototype.setupBoard = function () {
  let $row1 = $('<ul class="row-top" rownum="0"></ul>');
  let $row2 = $('<ul class="row-center" rownum="1"></ul>');
  let $row3 = $('<ul class="row-bottom" rownum="2"></ul>');

  let createCells = function(row) {
    for (let i = 0; i < 3; i++) {
      let $li = $(`<li pos="${row.attr("rownum")}${i}"></li>`);
      row.append($li);
    }
  };
  createCells($row1);
  this.$el.append($row1);
  createCells($row2);
  this.$el.append($row2);
  createCells($row3);
  this.$el.append($row3);
};

module.exports = View;
