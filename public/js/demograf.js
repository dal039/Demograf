/*****************************************************************************************
 ********************************** HELPER FUNCTIONS **************************************
 *****************************************************************************************/

/* Grab Data and open side menu */
var infoSlide = function(theArea) {
    var theArea = theArea;
    for (var key in Demograf.regionInfo) {
        if (Demograf.regionInfo.hasOwnProperty(key)) {
            if (key == theArea) {
                var median_house_value = (Demograf.regionInfo[key])['Median House Value'];
                var median_income = (Demograf.regionInfo[key])['Median Income'];
                var percentage_below_poverty = (Demograf.regionInfo[key])['Percentage Below Poverty'];
                var percentage_educated = (Demograf.regionInfo[key])['Percentage Educated'];
                var percentage_single = (Demograf.regionInfo[key])['Percentage Single'];
                var percentage_unemployed = (Demograf.regionInfo[key])['Percentage Unemployed'];
                break;
            }
        }
    }

    ($('#inside_side_menu').html(
          '<h3>' 
        + theArea 
        + '</h3>' 
        + '<p>'
        + 'Median House Value: ' 
        + median_house_value
        + '</p>'
        + '<p>'
        + 'Median Income: ' 
        + median_income
        + '</p>'
        + '<p>'
        + 'Percentage Below Poverty: ' 
        + percentage_below_poverty
        + '</p>'
        + '<p>'
        + 'Percentage Educated: ' 
        + percentage_educated
        + '</p>'
        + '<p>'
        + 'Percentage Single: ' 
        + percentage_single
        + '</p>'
        + '<p>'
        + 'Percentage Unemployed: ' 
        + percentage_unemployed
        + '</p>'
        ));
    $.sidr('open', 'side_menu');
}

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


var Demograf = Demograf || (function() {
    var self = {};
    /** 
     * Send an ajax request to the server to retrieve delphi db data.
     */



    self.getDelphiData = function() {

        // regions info
        self.regionInfo = {
            "Carlsbad": {},
            "Oceanside": {},
            "Pendleton": {},
            "San Dieguito": {},
            "Vista": {},
            "Coastal": {},
            "Del Mar-Mira Mesa": {},
            "Elliott-Navajo": {},
            "Kearny Mesa": {},
            "Miramar": {},
            "Peninsula": {},
            "University": {},
            "Central San Diego": {},
            "Mid City": {},
            "Southeastern San Diego": {},
            "Chula Vista": {},
            "Coronado": {},
            "National City": {},
            "South Bay": {},
            "Sweetwater": {},
            "Alpine": {},
            "El Cajon": {},
            "Harbison-Crest": {},
            "Jamul": {},
            "La Mesa": {},
            "Laguna-Pine Valley": {},
            "Lakeside": {},
            "Lemon Grove": {},
            "Mountain Empire": {},
            "Santee": {},
            "Spring Valley": {},
            "Anza-Borrego": {},
            "Escondido": {},
            "Fallbrook": {},
            "North San Diego": {},
            "Palomar-Julian": {},
            "Pauma": {},
            "Poway": {},
            "Ramona": {},
            "San Marcos": {},
            "Valley Center": {}
        };

        $.getJSON("/delphi_home_value", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            (self.regionInfo[key])['Median House Value'] = (data[i])['Median house value'];
                            break;
                        }
                    }
                }
            }
        });

        $.getJSON("/delphi_housing_cost", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            delete data[i].Area;
                            (self.regionInfo[key])['Housing Cost'] = (data[i]);
                            break;
                        }
                    }
                }
            }
        });

        $.getJSON("/delphi_median_income", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            (self.regionInfo[key])['Median Income'] = (data[i])['Median Household Income'];
                            break;
                        }
                    }
                }
            }
        });

        $.getJSON("/delphi_employment_status", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            (self.regionInfo[key])['Percentage Unemployed'] = (data[i])['Percentage Unemployed'];
                            break;
                        }
                    }
                }
            }
        });

        $.getJSON("/delphi_education", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            (self.regionInfo[key])['Percentage Educated'] = (data[i])['Percentage Educated'];
                            break;
                        }
                    }
                }
            }
        });

        $.getJSON("/delphi_population_by_age", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            delete data[i].Area;
                            (self.regionInfo[key])['Age Population'] = (data[i]);
                            break;
                        }
                    }
                }
            }
        });

        $.getJSON("/delphi_population_by_gender", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            delete data[i].Area;
                            (self.regionInfo[key])['Gender Population'] = (data[i]);
                            break;
                        }
                    }
                }
            }
        });

        $.getJSON("/delphi_population_by_race", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            delete data[i].Area;
                            (self.regionInfo[key])['Race Population'] = (data[i]);
                            break;
                        }
                    }
                }
            }
        });

        $.getJSON("/delphi_poverty", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            (self.regionInfo[key])['Percentage Below Poverty'] = (data[i])['Percentage Below Poverty'];
                            break;
                        }
                    }
                }
            }
        });

        $.getJSON("/delphi_public_programs", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            delete data[i].Area;
                            (self.regionInfo[key])['Public Programs'] = (data[i]);
                            break;
                        }
                    }
                }
            }
        });

        //$.getJSON("/delphi_occupational_industry", function(data) {
        //  console.log(data);
        //});

        $.getJSON("/delphi_marital_status", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            (self.regionInfo[key])['Percentage Single'] = (data[i])['Percentage Single'];
                            break;
                        }
                    }
                }
            }
        });

        /*$.getJSON("/delphi_languages", function(data) {
            console.log(data);
        });*/

        /*$.getJSON("/delphi_rental_statistics", function(data) {
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
                    infoSlide(geography.properties.name);
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

    Demograf.init();

    $(window).on('resize', function() {
        Demograf.map.resize();
    });

    $('#simple-menu').sidr({
        name: 'side_menu',
        side: 'right'
    });

    $("html").on("click", function(event) {
        if (!$(event.target).closest(".datamaps-subunit").length) {
            if ($(event.target).attr('class') != 'sidr right') {
                if (!$(event.target).closest(".inside_side_menu").length) {
                    $.sidr('close', 'side_menu');
                }
            }
        }


    });
    console.log(Demograf.regionInfo);
});
