visuals = new function() {

    var self = this;

    /* Publics */
    self.draw_map = function (canvas) {
        map.draw(canvas);
    };

}();


transforms = new function() {

    var self = this;

    /*Converts a grid coordinate to pixels*/
    self.placeOnGridX = function(x, y) {
        return Math.floor(0.5 * config.squareWidth * (x - y) - camera.x);
    };

    /*Converts a grid coordinate to pixels*/
    self.placeOnGridY = function(x, y) {
        return Math.floor(0.25 * config.squareWidth * (x + y) - camera.y);
    }
}();