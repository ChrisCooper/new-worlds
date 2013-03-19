camera = new function() {

    var self = this;

    self.x = -1700.0;
    self.y = 300.0;

    self.update = function(deltaT) {
        self.x += 60.0 * deltaT;
        self.y += 4.0 * deltaT;
    };
    
}();