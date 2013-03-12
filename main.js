
// PArameters
var FPS_target = 30;
var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 512;

// Components
var canvas;

// State
var textX = 50;
var textY = 50;

function init() {
  var canvasElement = $('<canvas width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '"></canvas>');
  canvas = canvasElement.get(0).getContext("2d");

  canvasElement.appendTo('#canvasDiv');
}

init();
setInterval(function() {
  update();
  draw();
}, 1000/FPS_target);


function draw() {
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  player.draw();
}



function update() {
  textX += 1;
  textY += 1;
}



var player = {
  color: "#00A",
  x: 220,
  y: 270,
  width: 32,
  height: 32,

  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
};