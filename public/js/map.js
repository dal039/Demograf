/////////////////////////////DATA MAPS VERSION////////////////////////////
var map = new Datamap({
    element: document.getElementById('map'),
    geographyConfig: {
        dataUrl: 'data/regions.topo.json'
    },
    scope: 'regions',
    responsive: true,
    fills: {
        defaultFill: '#212121'
    },
    setProjection: function(element) {
        var projection = d3.geo.mercator()
            .center([-116.9, 32.9])
            .scale(27000)
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

/////////////////////////////D3.js VERSION////////////////////////////
/*

//Map dimensions (in pixels)
var width = 800,
    height = 800;

//Map projection
var projection = d3.geo.mercator()
    .scale(28707.482332343843)
    .center([-116.8362929695832, 33.02270888414136]) //projection center
    .translate([width / 2, height / 2]) //translate to center the map in view

//Generate paths based on projection
var path = d3.geo.path()
    .projection(projection);

//Create an SVG
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

//Group for the map features
var features = svg.append("g")
    .attr("class", "features");

//Create a tooltip, hidden at the start
var tooltip = d3.select("body").append("div").attr("class", "tooltip");

d3.json("data/regions.topo.json", function(error, geodata) {
    if (error) return console.log(error); //unknown error, check the console

    //Create a path for each map feature in the data
    features.selectAll("path")
        .data(topojson.feature(geodata, geodata.objects.regions).features) //generate features from TopoJSON
        .enter()
        .append("path")
        .attr("d", path)
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseout", hideTooltip)
        .on("click", clicked);

});

// Add optional onClick events for features here
// d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
function clicked(d, i) {

}


//Position of the tooltip relative to the cursor
var tooltipOffset = {
    x: 5,
    y: -25
};

//Create a tooltip, hidden at the start
function showTooltip(d) {
    moveTooltip();

    tooltip.style("display", "block")
        .text(d.properties.name);
}

//Move the tooltip to track the mouse
function moveTooltip() {
    tooltip.style("top", (d3.event.pageY + tooltipOffset.y) + "px")
        .style("left", (d3.event.pageX + tooltipOffset.x) + "px");
}

//Create a tooltip, hidden at the start
function hideTooltip() {
    tooltip.style("display", "none");
}

*/
/////////////////////sliders/////////////////////
$(function() {
    $("#range").ionRangeSlider({
        type: "double",
        min: 0,
        max: 1000,
        to: 1000,
        from: 0,
        step: 100,
        prettify_enabled: true,
        prefix: "$",
        grid: true,
        grid_snap: true,
        force_edges: true
    });

});
