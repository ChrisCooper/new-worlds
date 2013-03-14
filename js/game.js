function Player(initialX, initialY) 
{    
    var self = this;

    self.color = new Color(0, 0, 255, 0);
    self.x = initialX;
    self.y = initialY;
    self.velX = 0;
    self.velY = 0;
    self.width = 32;
    self.height = 32;
    self.targetX = initialX;
    self.targetY = initialY;

    self.update = function(deltaT) {
        if (Math.random() < 0.1) {
            var accX = (Math.random() - 0.5);
            var accY = (Math.random() - 0.5);

            self.velX += accX * deltaT * 50;
            self.velY += accY * deltaT * 50;

            
        }

        self.velX += (self.targetX - self.x) * deltaT * 0.01;
        self.velY += (self.targetY - self.y) * deltaT * 0.01;

        self.velX *= 1 - (0.1 * deltaT);
        self.velY *= 1 - (0.1 * deltaT);

        self.speed = Math.sqrt(self.velX*self.velX + self.velY*self.velY);

        self.x += self.velX * deltaT * 50;
        self.y += self.velY * deltaT * 50;
    }

    self.draw = function(canvas) {
        canvas.fillStyle = self.color.redifiedRGBAstring(self.speed * 100);
        canvas.fillRect(self.x, self.y, self.width, self.height);
    }
}

function Color(r, g, b, a)
{
    this.red = r;
    this.green = g;
    this.blue = b;
    this.aplha = b;

    this.toRGBAstring = function() {
        return this.RGBAstring(this.red, this.green, this.blue, this.aplha);
    }

    this.RGBAstring = function(r, g, b, a) {
        return "rgba("+r+","+g+","+b+","+a+")";
    }

    this.redifiedRGBAstring = function(magnitude) {
        magnitude = Math.floor(magnitude);
        var r = Math.min(255, this.red + magnitude);
        var b = Math.max(0, this.blue - magnitude);
        return this.RGBAstring(r, this.green, b, this.aplha);
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
{    
    var self = this;

    self.FPS_target = 60;
    self.minimum_FPS = 10;
    
    self.CANVAS_WIDTH = 1024;
    self.CANVAS_HEIGHT = 640;

    self.num_objects = 100;

    // Components
    self.canvas = null;
    self.player = null;

    self.target_frame_interval = 1000/self.FPS_target;
    self.maximum_deltaT = 1000/self.minimum_FPS;
    

    self.update = function(deltaT) {
        self.players.map(function(p) {p.update(deltaT);});
    }

    self.draw = function() {
        ctx = self.canvas;
        ctx.clearRect(0, 0, self.CANVAS_WIDTH, self.CANVAS_HEIGHT);

        self.players.map(function(p) {p.draw(self.canvas);});
    }

    self.init = function() 
    {
        var canvasElement = $('<canvas width="' + self.CANVAS_WIDTH + '" height="' + self.CANVAS_HEIGHT + '"></canvas>');
        self.canvas = canvasElement.get(0).getContext("2d");
        
        canvasElement.appendTo('#canvasDiv');

        self.players = [];
        for (var i = 0; i < self.num_objects; i++) {
            self.players.push(new Player(self.CANVAS_WIDTH/2, self.CANVAS_HEIGHT/2));
        }

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
