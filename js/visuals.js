visuals = new function() {

    var self = this;

    /* Publics */
    self.draw_map = function (canvas) {
        for (var y = 0; y < config.mapWidth; y++) {
            for (var x = 0; x < config.mapHeight; x++) {
                canvas.drawImage(tile, self.placeOnGridX(x, y), self.placeOnGridY(x, y) - tile.printOffset);
            }
        }
    };


    /* Privates */

    /*Converts a grid coordinate to pixels*/
    self.placeOnGridX = function(x, y) {
        return Math.floor(0.5 * config.squareWidth * (x - y) + camera.x);
    };

    /*Converts a grid coordinate to pixels*/
    self.placeOnGridY = function(x, y) {
        return Math.floor(0.25 * config.squareWidth * (x + y) + camera.y);
    }


    var tile = new Image();

    tile.src = 'tile.png';
    tile.printOffset = 0;


}();



