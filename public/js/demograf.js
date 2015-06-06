/*****************************************************************************************
*************************************** SLIDERS ******************************************
*****************************************************************************************/

//Monthly Income
$(function() {
    $("#income").ionRangeSlider({
        type: "double",
        min: 40000,
        max: 130000,
        step: 10000,
        prettify_enabled: true,
        prefix: "$",
        grid: true,
        grid_snap: true,
        force_edges: true,
        onChange: function(data) {
            console.log("INCOME CHANGED: " + data.to);
        }
    });
});

//Unemployment %
$(function() {
    $("#unemployed").ionRangeSlider({
        type: "double",
        min: 0,
        max: 100,
        step: 10,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
    });
});

//snap %
$(function() {
    $("#snap").ionRangeSlider({
        type: "double",
        min: 0,
        max: 100,
        step: 10,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
    });
});

//cash_assistance %
$(function() {
    $("#cash_assistance").ionRangeSlider({
        type: "double",
        min: 0,
        max: 100,
        step: 10,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
    });
});

//Poverty %
$(function() {
    $("#poverty").ionRangeSlider({
        type: "double",
        min: 0,
        max: 100,
        step: 10,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
    });
});

//At least a Bachelors  Degree %
$(function() {
    $("#range8").ionRangeSlider({
        type: "double",
        min: 0,
        max: 100,
        step: 10,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
    });
});

//House value
$(function() {
    $("#house_value").ionRangeSlider({
        type: "double",
        min: 40000,
        max: 130000,
        step: 10000,
        prettify_enabled: true,
        prefix: "$",
        grid: true,
        grid_snap: true,
        force_edges: true
    });
});

//rent
$(function() {
    $("#rent").ionRangeSlider({
        type: "double",
        min: 40000,
        max: 130000,
        step: 10000,
        prettify_enabled: true,
        prefix: "$",
        grid: true,
        grid_snap: true,
        force_edges: true
    });
});

//Degree %
$(function() {
    $("#degree").ionRangeSlider({
        type: "double",
        min: 0,
        max: 100,
        step: 10,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
    });
});

//Speak Other Language %
$(function() {
    $("#language").ionRangeSlider({
        type: "double",
        min: 0,
        max: 100,
        step: 10,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
    });
});

//prints values
$(function() {
    $("#range8").on("change", function() {
        var $this = $(this),
            from = $this.data("from"),
            to = $this.data("to");

        console.log(from + " - " + to);
    });
});


/*****************************************************************************************
************************************ D3/GEOJSON MAP **************************************
*****************************************************************************************/

// regions info
var regionInfo = { 
    "Carlsbad" : {},
    "Oceanside" : {},
    "Pendleton" : {},
    "San Dieguito" : {},
    "Vista" : {},
    "Coastal" : {},
    "Del Mar-Mira Mesa" : {},
    "Elliott-Navajo" : {},
    "Kearny Mesa" : {},
    "Miramar" : {},
    "Peninsula" : {},
    "University" : {},
    "Central San Diego" : {},
    "Mid City" : {},
    "Southeastern San Diego" : {},
    "Chula Vista" : {},
    "Coronado" : {},
    "National City" : {},
    "South Bay" : {},
    "Sweetwater" : {},
    "Alpine" : {},
    "El Cajon" : {},
    "Harbison-Crest" : {},
    "Jamul" : {},
    "La Mesa" : {},
    "Laguna-Pine Valley" : {},
    "Lakeside" : {},
    "Lemon Grove" : {},
    "Mountain Empire" : {},
    "Santee" : {},
    "Spring Valley" : {},
    "Anza-Borrego" : {},
    "Escondido" : {},
    "Fallbrook" : {},
    "North San Diego" : {},
    "Palomar-Julian" : {},
    "Pauma" : {},
    "Poway" : {},
    "Ramona" : {},
    "San Marcos" : {},
    "Valley Center" : {}
};

var DelphiDemo = DelphiDemo || (function() {
    var self = {};
    /** 
     * Send an ajax request to the server to retrieve delphi db data.
     */
    self.getDelphiData = function() {
        
        /*$.getJSON("/delphi_home_value", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_housing_cost", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_median_income", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_employment_status", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_education", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_population_by_age", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_population_by_gender", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_population_by_race", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_poverty", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_public_programs", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_occupational_industry", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_marital_status", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_languages", function(data) {
            console.log(data);
        });

        $.getJSON("/delphi_rental_statistics", function(data) {
            console.log(data);
        });*/

    };

    self.createMap = function() {
        self.map = new Datamap({
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
            },
            done: function(datamap) {
                datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                    console.log(geography.properties.name);
                });
            }
        });

    };

    /** 
     * initialize 
     */
    self.init = function() {
        self.getDelphiData();
        self.createMap();
    };

    return self;
})();


/*****************************************************************************************
************************************* ENTRY POINT ****************************************
*****************************************************************************************/

$(document).ready(function() {

    DelphiDemo.init();

    $(window).on('resize', function() {
        DelphiDemo.map.resize();
    });

    (DelphiDemo.map.svg[0])[0].id = "demograf-map";    
});
