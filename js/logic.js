logic = new function() {

    var self = this;

    self.init = function() {
        map.init();
    }

    self.update_game = function(deltaT) {
        camera.update(deltaT);
    };
}();