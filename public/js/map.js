var map = new Datamap({
    element: document.getElementById('map'),
    geographyConfig: {
        dataUrl: 'data/regions.topo.json'
    },
    scope: 'regions',
    responsive: true,
    fills: {
        defaultFill: 'green'
    },
    setProjection: function(element) {
        var projection = d3.geo.mercator()
            .center([-117.1625, 32.7150])
            .scale(20000)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
        var path = d3.geo.path().projection(projection);
        return {
            path: path,
            projection: projection
        };
    }
});
$(window).on('resize', function() {
    map.resize();
});
