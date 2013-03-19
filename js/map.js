map = new function() {

    var self = this;

    self.width = config.mapWidth;
    self.height = config.mapHeight;


    self.tiles = new Array(self.height);
    for (var y = 0; y < self.width; y++) {
        self.tiles[y] = new Array(self.width);
    }

    self.init = function() {
        for (var y = 0; y < self.height; y++) {
            for (var x = 0; x < self.width; x++) {
                self.tiles[y][x] = new Tile();
            }
        }
    };

    self.update = function(deltaT) {
    };

    self.draw = function(canvas) {
        for (var y = 0; y < self.height; y++) {
            for (var x = 0; x < self.width; x++) {
                var tile = self.tiles[y][x];
                var drawX = transforms.placeOnGridX(x, y);
                var drawY = transforms.placeOnGridY(x, y) - tile.printOffset;
                if (drawX >= -config.squareWidth && drawX < game.CANVAS_WIDTH && drawY >= -100 && drawY < game.CANVAS_HEIGHT){
                    canvas.drawImage(tile.image, drawX, drawY);
                }
            }
        }
    };

    self.forAllTiles = function(f){
        for (var y = 0; y < self.height; y++) {
            self.tiles[y].map(f);
        }
    }

}();


var Tile = function() {
    var self = this;

    var num_images = 21;
    var random_index = Math.floor(Math.random() * (num_images - 1)) + 1;

    self.image = new Image();
    self.image.src = "img/tile" + random_index + ".gif";

    self.printOffset = 0;
}
