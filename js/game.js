

game = new function ()
{
    var self = this;

    self.FPS_target = 60;
    self.minimum_FPS = 10;

    self.CANVAS_WIDTH = 1024;
    self.CANVAS_HEIGHT = 640;


    // Components

    self.target_frame_interval = 1000/self.FPS_target;
    self.maximum_deltaT = 1000/self.minimum_FPS;
    

    self.update = function(deltaT) {
        logic.update_game(deltaT);
    };

    self.draw = function() {
        self.canvas.clearRect(0, 0, self.CANVAS_WIDTH, self.CANVAS_HEIGHT);

        visuals.draw_map(self.canvas);
    };

    self.init = function() 
    {
        var canvasElement = $('<canvas width="' + self.CANVAS_WIDTH + '" height="' + self.CANVAS_HEIGHT + '"></canvas>');
        self.canvas = canvasElement.get(0).getContext("2d");
        
        canvasElement.appendTo('#canvasDiv');

        logic.init();
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
    };
}();


$('#launchGameButton').click(function() {
    console.log("Launching game");

    $('#launchGameButton').remove();

    //$("#fullscreenDiv").get()[0].webkitRequestFullScreen(); //Chrome
    //$("#fullscreenDiv").get()[0].mozRequestFullScreen(); //Firefox

    game.init();
    gui.addStats(game);
    game.run();
});
