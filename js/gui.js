gui = new function() {

    var self = this;

    self.addStats = function(g)
    {
        var stats = new Stats();
        stats.setMode(0); // 0: fps, 1: ms

        $("#statsDiv").append(stats.domElement);
        g.stats = stats;
    }
    
}();


