/*****************************************************************************************
 ********************************** SIDE MENU **************************************
 *****************************************************************************************/
/* Grab Data and open side menu */
var open_side_menu = function(theArea) {
    //Array to hold all median incomes
    var all_median_incomes = [];
    //Loop through object and add data to variables
    for (var key in Demograf.regionInfo) {
        if (Demograf.regionInfo.hasOwnProperty(key)) {
            //add to all median incomes array
            all_median_incomes.push((Demograf.regionInfo[key])['Median House Value']);
            if (key == theArea) {
                //Age Population
                //Get Vars
                var zero_four = ((Demograf.regionInfo[key])['Age Population'])['0-4 Population'];
                var five_fourteen = ((Demograf.regionInfo[key])['Age Population'])['5-14 Population'];
                var fifteen_twentyfour = ((Demograf.regionInfo[key])['Age Population'])['15-24 Population'];
                var twentyfive_fourtyfour = ((Demograf.regionInfo[key])['Age Population'])['25-44 Population'];
                var fourtyfive_sixtyfour = ((Demograf.regionInfo[key])['Age Population'])['45-64  Population'];
                var sixtyfive_plus = ((Demograf.regionInfo[key])['Age Population'])['65+ Population'];
                var largest_age = ((Demograf.regionInfo[key])['Age Population'])['Largest Age'];
                /* //Compute Percentages
                var total_age = (zero_four + five_fourteen + fifteen_twentyfour + twentyfive_fourtyfour + fourtyfive_sixtyfour + sixtyfive_plus);
                zero_four = numeral(zero_four / total_age * 100).format('0.00');
                five_fourteen = numeral(five_fourteen / total_age * 100).format('0.00');
                fifteen_twentyfour = numeral(fifteen_twentyfour / total_age * 100).format('0.00');
                twentyfive_fourtyfour = numeral(twentyfive_fourtyfour / total_age * 100).format('0.00');
                fourtyfive_sixtyfour = numeral(fourtyfive_sixtyfour / total_age * 100).format('0.00');
                sixtyfive_plus = numeral(sixtyfive_plus / total_age * 100).format('0.00');*/

                //Gender Population
                var female = ((Demograf.regionInfo[key])['Gender Population'])['Female Population'];
                var male = ((Demograf.regionInfo[key])['Gender Population'])['Male Population'];
                var largest_gender = ((Demograf.regionInfo[key])['Gender Population'])['Largest Gender'];

                //Housing Cost
                var twenty_twentynine = ((Demograf.regionInfo[key])['Housing Cost'])['Percent of Household Income on Housing 20-29% (Average)'];
                var greater_thirty = ((Demograf.regionInfo[key])['Housing Cost'])['Percent of Household Income on Housing  >30% (Average)'];
                var less_twenty = ((Demograf.regionInfo[key])['Housing Cost'])['Percent of Household Income on Housing <20% (Average)'];
                //Get rid of percentages
                twenty_twentynine = numeral().unformat(twenty_twentynine);
                greater_thirty = numeral().unformat(greater_thirty);
                less_twenty = numeral().unformat(less_twenty);

                //Median House Value
                var median_house_value = (Demograf.regionInfo[key])['Median House Value'];
                var median_house_value = numeral(median_house_value).format('$0,0');

                //Median Income
                var median_income = (Demograf.regionInfo[key])['Median Income'];

                //Percentage Below Poverty
                var percentage_below_poverty = (Demograf.regionInfo[key])['Percentage Below Poverty'];
                //var percentage_below_poverty = numeral(percentage_below_poverty).format('0.00%');
                percentage_below_poverty = percentage_below_poverty * 100;
                var percentage_above_poverty = 1 - percentage_below_poverty;
                //console.log(percentage_below_poverty);
                //Percentage Educated
                var percentage_educated = (Demograf.regionInfo[key])['Percentage Educated'];

                //Percentage Single
                var percentage_single = (Demograf.regionInfo[key])['Percentage Single'];

                //Percentage Unemployed
                var percentage_unemployed = (Demograf.regionInfo[key])['Percentage Unemployed'];

                //Public Programs
                var cash_assistance = ((Demograf.regionInfo[key])['Public Programs'])['Percentage With Cash Assistance'];
                var snap = ((Demograf.regionInfo[key])['Public Programs'])['Percentage With SNAP'];

                //Race Population
                var asian = ((Demograf.regionInfo[key])['Race Population'])['Asian/Pacific Islander Population'];
                var black = ((Demograf.regionInfo[key])['Race Population'])['Black Population'];
                var hispanic = ((Demograf.regionInfo[key])['Race Population'])['Hispanic Population'];
                var white = ((Demograf.regionInfo[key])['Race Population'])['White Population'];
                var other = ((Demograf.regionInfo[key])['Race Population'])['Other Race/Ethnicity Population'];
                var largest_race = ((Demograf.regionInfo[key])['Race Population'])['Largest Race'];
                break;
            }
        }
    }
    all_median_incomes.sort();

    /*
        //Add HTML to Side Menu
        ($('#inside_side_menu').html(
           '</p>' + '<p>' + 'Median Income: ' + median_income + '</p>' + '<p>' + 'Percentage Below Poverty: ' + percentage_below_poverty + '</p>' + '<p>' + 'Percentage Educated: ' + percentage_educated + '</p>' + '<p>' + 'Percentage Single: ' + percentage_single + '</p>' + '<p>' + 'Percentage Unemployed: ' + percentage_unemployed + '</p>'
        ));
    */

    //Area Name
    ($('#area_name').html('<h3>' + theArea + '</h3>'));

    //Age Graph
    var age_chart = c3.generate({
        bindto: '#age_chart',
        donut: {
            title: "Age Breakdown"
        },
        data: {
            type: 'donut',
            columns: [
                ['0-4', zero_four],
                ['5-14', five_fourteen],
                ['15-25', fifteen_twentyfour],
                ['25-44', twentyfive_fourtyfour],
                ['45-64', fourtyfive_sixtyfour],
                ['65+', sixtyfive_plus]
            ]
        }
    });

    //Sex Graph
    var sex_chart = c3.generate({
        bindto: '#sex_chart',
        donut: {
            title: "Sex Breakdown"
        },
        data: {
            type: 'donut',
            columns: [
                ['Male', male],
                ['Female', female]
            ]
        }
    });

    //Housing Cost Chart
    var housingcost_chart = c3.generate({
        bindto: '#housingcost_chart',
        donut: {
            title: "Percent of Household Income on Housing"
        },
        data: {
            type: 'donut',
            columns: [
                ['20%-29%', twenty_twentynine],
                ['>30%', greater_thirty],
                ['<20%', less_twenty]
            ]
        }
    });

    //Median House Value
    //($('#median_house_value').html('<p>' + 'Median House Value: ' + median_house_value));
    //Median House Vale Chart
    var median_house_value_chart = c3.generate({
        bindto: '#median_house_value_chart',
        data: {
            columns: [
                all_median_incomes
            ],
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            },
            // or
            //width: 100 // this makes bar width 100px
        }
    });

    //Median Income

    //Percentage Below Poverty
    var poverty_chart = c3.generate({
        bindto: '#poverty_chart',
        data: {
            columns: [
                ['Below Poverty', percentage_below_poverty]
            ],
            type: 'gauge',

        },
        gauge: {}
    });


    //Open Side Menu
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
            "Alpine": {},
            "Anza-Borrego": {},
            "Carlsbad": {},
            "Central San Diego": {},
            "Chula Vista": {},
            "Coastal": {},
            "Coronado": {},
            "Del Mar-Mira Mesa": {},
            "El Cajon": {},
            "Elliott-Navajo": {},
            "Escondido": {},
            "Fallbrook": {},
            "Harbison-Crest": {},
            "Jamul": {},
            "Kearny Mesa": {},
            "La Mesa": {},
            "Laguna-Pine Valley": {},
            "Lakeside": {},
            "Lemon Grove": {},
            "Mid City": {},
            "Miramar": {},
            "Mountain Empire": {},
            "National City": {},
            "North San Diego": {},
            "Oceanside": {},
            "Palomar-Julian": {},
            "Pauma": {},
            "Pendleton": {},
            "Peninsula": {},
            "Poway": {},
            "Ramona": {},
            "San Dieguito": {},
            "San Marcos": {},
            "Santee": {},
            "South Bay": {},
            "Southeastern San Diego": {},
            "Spring Valley": {},
            "Sweetwater": {},
            "University": {},
            "Valley Center": {},
            "Vista": {}
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

        //NEED EDUCATION

        //NEED OCUPATION

    };
    /* Create Map */
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
                    open_side_menu(geography.properties.name);
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

    //Resizes Map
    $(window).on('resize', function() {
        Demograf.map.resize();
    });

    //Creates Side Menu
    $('#simple-menu').sidr({
        name: 'side_menu',
        side: 'right'
    });

    //Closes Side Menu
    $("html").on("click", function(event) {
        if (!$(event.target).closest(".side_menu_top").length) {
            if (!$(event.target).closest(".datamaps-subunit").length) {
                if ($(event.target).attr('class') != 'sidr right') {
                    if (!$(event.target).closest(".inside_side_menu").length) {
                        $.sidr('close', 'side_menu');
                    }
                }
            }
        }
    });
    console.log(Demograf.regionInfo);
});
