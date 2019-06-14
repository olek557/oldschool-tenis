var BALL_HEIGHT = 20;
var PLAYER_HEIGHT = 10;
var ball = document.getElementById("ball");
var playerTop = document.getElementById("player1");
var playerBottom = document.getElementById("player2");
var field = document.getElementById("field");
var direction;

function init() {
  direction = "TOP";
  ball.style.top = "150px";
  setInterval(() => {
    moveBall(direction);
  }, 1);
}

/**
 * {Object} option
 * yPosition
 */
function Player(option) {
  this.YPosition = option.YPosition;
  this.controls = option.controls;

}

Player.prototype.init = function() {

}

Player.prototype.move = function() {

};

var player1Options = {
  YPosition: 0,
  controls: { left: 12, right: 12 }
};

var player1 = new Player(player1Options);

function moveBall(direction) {
  checkCollision();
  if (direction === "TOP") {
    ball.style.top = getValueWithoutPx(ball.style.top) - 1 + "px";
  } else {
    ball.style.top = getValueWithoutPx(ball.style.top) + 1 + "px";
  }
}

// ADD EVENT LISTENER
field.addEventListener("colision", event => {
  direction = event.detail.direction;
});

// HELPERRS

function getValueWithoutPx(valueWithPx) {
  return +valueWithPx.slice(0, -2);
}

// EVENT
function dispatchColisionEvent(direction) {
  var colision = new CustomEvent("colision", {
    detail: { direction: direction }
  });
  field.dispatchEvent(colision);
}

// CHECK COLISION
function checkCollision() {
  var ballTop = getValueWithoutPx(ball.style.top);
  var ballBottom = getValueWithoutPx(ball.style.top) + BALL_HEIGHT;

  if (ballTop === playerTop.offsetTop + PLAYER_HEIGHT) {
    dispatchColisionEvent("BOTTOM");
  }
  if (ballBottom === playerBottom.offsetTop) {
    dispatchColisionEvent("TOP");
  }
}

// INIT GAME
init();
