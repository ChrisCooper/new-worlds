
var x = 50;
var y = 50;


function Game() {
    var self = this;

    self.FPS_target = 1;
    self.minimum_FPS = 10;
    
    self.CANVAS_WIDTH = 640;
    self.CANVAS_HEIGHT = 512;

    // Components
    self.canvas = null;


    self.target_frame_interval = 1000/self.FPS_target;
    self.maximum_deltaT = 1000/self.minimum_FPS;
    

    self.update = function(deltaT) {
        //x = x + 1 * deltaT;
        //y = y + 1 * deltaT;
        console.log(deltaT);
        x = x + 80 * deltaT;
    }

    self.draw = function() {
        ctx = self.canvas;
        ctx.clearRect(0, 0, self.CANVAS_WIDTH, self.CANVAS_HEIGHT);
        ctx.fillStyle = "#000";
        ctx.fillRect(x, y, 50, 50);
    }

    self.init = function() 
    {
        var canvasElement = $('<canvas width="' + self.CANVAS_WIDTH + '" height="' + self.CANVAS_HEIGHT + '"></canvas>');
        self.canvas = canvasElement.get(0).getContext("2d");
        
        canvasElement.appendTo('#canvasDiv');
    };


    self.last_update_time = Date.now();

    self.game_loop_step = function()
    {
        var deltaT = Math.min(Date.now() - self.last_update_time, self.maximum_deltaT);
        self.last_update_time = Date.now();
        
        var frame_start_time = Date.now();
        
        ///////////////////////////////////
        self.update(deltaT/1000);
        self.draw();
        ///////////////////////////////////
        
        var frame_run_time = Date.now() - frame_start_time;

        var timeout_time = Math.max(self.target_frame_interval - frame_run_time, 0);

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
