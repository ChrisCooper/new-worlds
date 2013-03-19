
function addStats(game)
{
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    $("#statsDiv").append(stats.domElement);
    game.stats = stats;
}

function Game() 
{    
    var self = this;

    self.FPS_target = 60;
    self.minimum_FPS = 10;
    
    self.CANVAS_WIDTH = 1024;
    self.CANVAS_HEIGHT = 640;


    // Components
    self.canvas = null;

    self.target_frame_interval = 1000/self.FPS_target;
    self.maximum_deltaT = 1000/self.minimum_FPS;
    

    self.update = function(deltaT) {
    }

    self.draw = function() {
        ctx = self.canvas;
        ctx.clearRect(0, 0, self.CANVAS_WIDTH, self.CANVAS_HEIGHT);

        draw_map();
    }

    self.init = function() 
    {
        var canvasElement = $('<canvas width="' + self.CANVAS_WIDTH + '" height="' + self.CANVAS_HEIGHT + '"></canvas>');
        self.canvas = canvasElement.get(0).getContext("2d");
        
        canvasElement.appendTo('#canvasDiv');

        addStats(self);
    };


    self.last_update_time = Date.now();

    self.game_loop_step = function()
    {
        var deltaT = Math.min(Date.now() - self.last_update_time, self.maximum_deltaT);
        self.last_update_time = Date.now();
        
        var frame_start_time = Date.now();

        self.stats.begin();
        
        ///////////////////////////////////
        self.update(deltaT/1000);
        self.draw();
        ///////////////////////////////////
        
        var frame_run_time = Date.now() - frame_start_time;

        var timeout_time = Math.max(self.target_frame_interval - frame_run_time, 0);

        self.stats.end();

        setTimeout(self.game_loop_step, timeout_time);
    };

    self.run = function() {
        self.draw();
        self.game_loop_step();
    }
}

var game = new Game();


$('#launchGameButton').click(function() {
    console.log("Launching game");

    $('#launchGameButton').remove();

    //$("#fullscreenDiv").get()[0].webkitRequestFullScreen(); //Chrome
    //$("#fullscreenDiv").get()[0].mozRequestFullScreen(); //Firefox

    game.init();
    game.run();
});

/* VISUALS */

var cameraX = 0;
var cameraY = 0;

var squareWidth = 56;
var mapWidth = 10;
var mapHeight = 10;

var tile = new Image();

tile.src = 'tile.png';

var draw_map = function() {
    for (var y = 0; y < mapWidth; y++) {
        for (var x = 0; x < mapHeight; x++) {
            //draw_sprite(screenBuffer, aMapSquare[x][y].picture, ,  - anObject[aMapSquare[x][y].objectType].printOffset);
            ctx.drawImage(tile, placeOnGridX(x, y), placeOnGridY(x, y));
        }
    }
}

/*Converts a grid coordinate to pixels*/
var placeOnGridX = function(x, y) {
    return Math.floor(0.5*squareWidth*(x-y) + cameraX);
}

/*Converts a grid coordinate to pixels*/
var placeOnGridY = function(x, y) {
    return Math.floor(0.25*squareWidth*(x+y) + cameraY);
}