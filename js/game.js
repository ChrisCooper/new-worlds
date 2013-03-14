function Player() 
{    
    var self = this;

    self.color = "#00A";
    self.x = 220;
    self.y = 270;
    self.width = 32;
    self.height = 32;

    self.draw = function(canvas) {
        canvas.fillStyle = self.color;
        canvas.fillRect(self.x, self.y, self.width, self.height);
    }

    self.update = function(deltaT) {

    }
}

function addStats(game)
{
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    $("#statsDiv").append(stats.domElement);
    game.stats = stats;
}

function Game() 
{    var self = this;

    self.FPS_target = 60;
    self.minimum_FPS = 10;
    
    self.CANVAS_WIDTH = 640;
    self.CANVAS_HEIGHT = 512;

    // Components
    self.canvas = null;
    self.player = null;

    self.target_frame_interval = 1000/self.FPS_target;
    self.maximum_deltaT = 1000/self.minimum_FPS;
    

    self.update = function(deltaT) {
        self.player.x += 80 * deltaT;
    }

    self.draw = function() {
        ctx = self.canvas;
        ctx.clearRect(0, 0, self.CANVAS_WIDTH, self.CANVAS_HEIGHT);

        self.player.draw(self.canvas);
    }

    self.init = function() 
    {
        var canvasElement = $('<canvas width="' + self.CANVAS_WIDTH + '" height="' + self.CANVAS_HEIGHT + '"></canvas>');
        self.canvas = canvasElement.get(0).getContext("2d");
        
        canvasElement.appendTo('#canvasDiv');

        self.player = new Player();

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
game.init();
game.run();
