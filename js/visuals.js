visuals = new function() {

    var self = this;

    /* Publics */
    self.draw_map = function (canvas) {
        map.draw(canvas);
    };

    //Draws an image if it actaully appears on the canvas
    self.clipped_draw = function(canvas, image, pixelX, pixelY) {
        if (pixelX >= -image.width && pixelX < game.CANVAS_WIDTH && pixelY >= -image.height && pixelY < game.CANVAS_HEIGHT){
            canvas.drawImage(image, pixelX, pixelY);
        }
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