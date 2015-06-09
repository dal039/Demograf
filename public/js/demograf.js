var updateMap = function() {

    for (var key in Demograf.regionInfo) {
        if (Demograf.regionInfo.hasOwnProperty(key)) {

            var regionId = key.replace(/ /g, "_");
            var filterData, lower, upper, currRegionData;

            // loop through all filters for current region, if fail even once then break to next region
            for (var k in Demograf.allFilters) {

                filterData = Demograf.allFilters[k];
                lower = filterData.lower;
                upper = filterData.upper;

                currRegionData = numeral().unformat(((Demograf.regionInfo[key])[k]));

                if ((currRegionData >= lower) && (currRegionData <= upper)) {
                    Demograf.map.svg.select('path#' + regionId).style('fill', '#2196f3', 'important');
                } else {
                    Demograf.map.svg.select('path#' + regionId).style('fill', '#989898', 'important');
                    break;
                }
            }
        }
    }
};

/*****************************************************************************************
 ********************************** SIDE MENU ********************************************
 *****************************************************************************************/
/* Grab Data and open side menu */
var open_side_menu = function(theArea) {

    //Loop through object and add data to variables
    for (var key in Demograf.regionInfo) {
        if (Demograf.regionInfo.hasOwnProperty(key)) {

            if (key == theArea) {
                //Age Population
                var zero_four = ((Demograf.regionInfo[key]))['0-4 Population'];
                var five_fourteen = ((Demograf.regionInfo[key]))['5-14 Population'];
                var fifteen_twentyfour = ((Demograf.regionInfo[key]))['15-24 Population'];
                var twentyfive_fourtyfour = ((Demograf.regionInfo[key]))['25-44 Population'];
                var fourtyfive_sixtyfour = ((Demograf.regionInfo[key]))['45-64  Population'];
                var sixtyfive_plus = ((Demograf.regionInfo[key]))['65+ Population'];
                var largest_age = ((Demograf.regionInfo[key]))['Largest Age'];

                //Gender Population
                var female = ((Demograf.regionInfo[key]))['Female Population'];
                var male = ((Demograf.regionInfo[key]))['Male Population'];
                var largest_gender = ((Demograf.regionInfo[key]))['Largest Gender'];

                //Housing Cost
                var twenty_twentynine = ((Demograf.regionInfo[key]))['Percent of Household Income on Housing 20-29% (Average)'];
                var greater_thirty = ((Demograf.regionInfo[key]))['Percent of Household Income on Housing  >30% (Average)'];
                var less_twenty = ((Demograf.regionInfo[key]))['Percent of Household Income on Housing <20% (Average)'];
                //Get rid of percentages
                twenty_twentynine = numeral().unformat(twenty_twentynine);
                greater_thirty = numeral().unformat(greater_thirty);
                less_twenty = numeral().unformat(less_twenty);

                //Median House Value
                var median_house_value = (Demograf.regionInfo[key])['Median House Value'];
                var median_house_value = numeral(median_house_value).format('$0,0');

                //Median Income
                var median_income = (Demograf.regionInfo[key])['Median Income'];
                median_income = numeral().unformat(median_income);
                var median_income = numeral(median_income).format('$0,0.');

                //Percentage Below Poverty
                var percentage_below_poverty = (Demograf.regionInfo[key])['Percentage Below Poverty'];
                percentage_below_poverty = numeral(percentage_below_poverty).format('0.00');

                //Percentage High School
                var high_school = (Demograf.regionInfo[key])['Percentage High School'];
                high_school = numeral(high_school).format('0.00');

                //Percentage Associates
                var high_school = (Demograf.regionInfo[key])['Percentage High School'];
                high_school = numeral(high_school).format('0.00');

                //Percentage Bachelors 
                var bachelor = (Demograf.regionInfo[key])['Percentage Bachelor Degree'];
                bachelor = numeral(bachelor).format('0.00');

                //Percentage Masters
                var master = (Demograf.regionInfo[key])['Percentage Master Degree'];
                master = numeral(master).format('0.00');

                //Percentage Single
                var percentage_single = (Demograf.regionInfo[key])['Percentage Single'];
                percentage_single = numeral(percentage_single * 100).format('0.00');

                //Percentage Unemployed
                var percentage_unemployed = (Demograf.regionInfo[key])['Percentage Unemployed'];
                percentage_unemployed = numeral(percentage_unemployed).format('0.00');

                //Cash Assistance
                var cash_assistance = ((Demograf.regionInfo[key]))['Percentage With Cash Assistance'];
                cash_assistance = numeral(cash_assistance).format('0.00');

                //SNAP
                var snap = ((Demograf.regionInfo[key]))['Percentage With SNAP'];
                snap = numeral(snap).format('0.00');

                //Race Population
                var asian = ((Demograf.regionInfo[key]))['Asian/Pacific Islander Population'];
                var black = ((Demograf.regionInfo[key]))['Black Population'];
                var hispanic = ((Demograf.regionInfo[key]))['Hispanic Population'];
                var white = ((Demograf.regionInfo[key]))['White Population'];
                var other = ((Demograf.regionInfo[key]))['Other Race/Ethnicity Population'];
                var largest_race = ((Demograf.regionInfo[key]))['Largest Race'];

                //Median Contract Rent
                var median_contract_rent = ((Demograf.regionInfo[key]))['Median Contract Rent'];
                median_contract_rent = numeral(median_contract_rent).format('$0,0.');
                break;
            }
        }
    }

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

        data: {
            type: 'donut',
            columns: [
                ['20%-29%', twenty_twentynine],
                ['>30%', greater_thirty],
                ['<20%', less_twenty]
            ]
        }
    });

    //Median House Vale Chart
    ($('#median_house_value_chart').html('<h3 class="text-center">' + median_house_value + '</h3>'));


    //Median Income
    ($('#median_income_value_chart').html('<h3 class="text-center">' + median_income + '</h3>'));

    //Median Contract Rent
    ($('#median_contract_rent_chart').html('<h3 class="text-center">' + median_contract_rent + '</h3>'));

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

    //Percentage with High School Diploma
    var high_school_chart = c3.generate({
        bindto: '#high_school_chart',
        data: {
            columns: [
                ['Population 25+ with High School Deiploma', high_school]
            ],
            type: 'gauge',

        },
        gauge: {}
    });
    //associates_chart
    var associates_chart = c3.generate({
        bindto: '#associates_chart',
        data: {
            columns: [
                ['Population 25+ with Associate\'s Degree', high_school]
            ],
            type: 'gauge',

        },
        gauge: {}
    });

    //bachelors_chart
    var bachelors_chart = c3.generate({
        bindto: '#bachelors_chart',
        data: {
            columns: [
                ['Population 25+ with Bachelor\'s Degree', bachelor]
            ],
            type: 'gauge',

        },
        gauge: {}
    });

    //masters_chart
    var masters_chart = c3.generate({
        bindto: '#masters_chart',
        data: {
            columns: [
                ['Population 25+ with Master\'s Degree', master]
            ],
            type: 'gauge',

        },
        gauge: {}
    });

    //Percentage Single
    var marital_status_chart = c3.generate({
        bindto: '#marital_status_chart',
        donut: {
            title: "Marital status"
        },
        data: {
            type: 'donut',
            columns: [
                ['Population 15+ Single', percentage_single]
            ]
        }
    });

    //Percentage unemployed
    var unemployed_chart = c3.generate({
        bindto: '#unemployed_chart',
        data: {
            columns: [
                ['Unemployed', percentage_unemployed]
            ],
            type: 'gauge',

        },
        gauge: {}
    });

    //Percentage cash assistance
    var cash_chart = c3.generate({
        bindto: '#cash_chart',
        data: {
            columns: [
                ['Households With Cash Assistance', cash_assistance]
            ],
            type: 'gauge',

        },
        gauge: {}
    });

    //Percentage snap
    var snap_chart = c3.generate({
        bindto: '#snap_chart',
        data: {
            columns: [
                ['Households With SNAP', snap]
            ],
            type: 'gauge',

        },
        gauge: {}
    });

    //Race
    var race_chart = c3.generate({
        bindto: '#race_chart',
        donut: {
            title: "Race Breakdown"
        },
        data: {
            type: 'donut',
            columns: [
                ['Asian/Pacific Islander', asian],
                ['Black', black],
                ['Hispanic', hispanic],
                ['White', white],
                ['Other', other]
            ]
        }
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
        onStart: function(data) {
            Demograf.allFilters['Median Income'].lower = data.from;
            Demograf.allFilters['Median Income'].upper = data.to;
        },
        onChange: function(data) {
            Demograf.allFilters['Median Income'].lower = data.from;
            Demograf.allFilters['Median Income'].upper = data.to;
            updateMap();
        }
    });
});

//Unemployment %
$(function() {
    $("#unemployed").ionRangeSlider({
        type: "double",
        min: 0,
        max: 16,
        step: 1,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
        onStart: function(data) {
            Demograf.allFilters['Percentage Unemployed'].lower = data.from;
            Demograf.allFilters['Percentage Unemployed'].upper = data.to;
        },
        onChange: function(data) {
            Demograf.allFilters['Percentage Unemployed'].lower = data.from;
            Demograf.allFilters['Percentage Unemployed'].upper = data.to;
            updateMap();
        }
    });
});

//snap %
$(function() {
    $("#snap").ionRangeSlider({
        type: "double",
        min: 0,
        max: 12,
        step: 1,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
        onStart: function(data) {
            Demograf.allFilters['Percentage With SNAP'].lower = data.from;
            Demograf.allFilters['Percentage With SNAP'].upper = data.to;
        },
        onChange: function(data) {
            Demograf.allFilters['Percentage With SNAP'].lower = data.from;
            Demograf.allFilters['Percentage With SNAP'].upper = data.to;
            updateMap();
        }
    });
});

//cash_assistance %
$(function() {
    $("#cash_assistance").ionRangeSlider({
        type: "double",
        min: 0,
        max: 8,
        step: 1,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
        onStart: function(data) {
            Demograf.allFilters['Percentage With Cash Assistance'].lower = data.from;
            Demograf.allFilters['Percentage With Cash Assistance'].upper = data.to;
        },
        onChange: function(data) {
            Demograf.allFilters['Percentage With Cash Assistance'].lower = data.from;
            Demograf.allFilters['Percentage With Cash Assistance'].upper = data.to;
            updateMap();
        }

    });
});

//Poverty %
$(function() {
    $("#poverty").ionRangeSlider({
        type: "double",
        min: 0,
        max: 26,
        step: 2,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
        onStart: function(data) {
            Demograf.allFilters['Percentage Below Poverty'].lower = data.from;
            Demograf.allFilters['Percentage Below Poverty'].upper = data.to;
        },
        onChange: function(data) {
            Demograf.allFilters['Percentage Below Poverty'].lower = data.from;
            Demograf.allFilters['Percentage Below Poverty'].upper = data.to;
            updateMap();
        }

    });
});

//At least a Bachelors Degree %
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
        min: 100000,
        max: 800000,
        step: 50000,
        prettify_enabled: true,
        prefix: "$",
        grid: true,
        grid_snap: true,
        force_edges: true,
        onStart: function(data) {
            Demograf.allFilters['Median House Value'].lower = data.from;
            Demograf.allFilters['Median House Value'].upper = data.to;
        },
        onChange: function(data) {
            Demograf.allFilters['Median House Value'].lower = data.from;
            Demograf.allFilters['Median House Value'].upper = data.to;
            updateMap();
        }

    });
});

//rent
$(function() {
    $("#rent").ionRangeSlider({
        type: "double",
        min: 600,
        max: 2000,
        step: 100,
        prettify_enabled: true,
        prefix: "$",
        grid: true,
        grid_snap: true,
        force_edges: true,
        onStart: function(data) {
            Demograf.allFilters['Median Contract Rent'].lower = data.from;
            Demograf.allFilters['Median Contract Rent'].upper = data.to;
        },
        onChange: function(data) {
            Demograf.allFilters['Median Contract Rent'].lower = data.from;
            Demograf.allFilters['Median Contract Rent'].upper = data.to;
            updateMap();
        }

    });
});

//Bach Degree %
$(function() {
    $("#degree").ionRangeSlider({
        type: "double",
        min: 0,
        max: 40,
        step: 2,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
        onStart: function(data) {
            Demograf.allFilters['Percentage Bachelor Degree'].lower = data.from;
            Demograf.allFilters['Percentage Bachelor Degree'].upper = data.to;
        },
        onChange: function(data) {
            Demograf.allFilters['Percentage Bachelor Degree'].lower = data.from;
            Demograf.allFilters['Percentage Bachelor Degree'].upper = data.to;
            updateMap();
        }
    });
});

//Speak Other Language %
$(function() {
    $("#language").ionRangeSlider({
        type: "double",
        min: 0,
        max: 15,
        step: 1,
        prettify_enabled: true,
        postfix: "%",
        grid: true,
        grid_snap: true,
        force_edges: true,
        onStart: function(data) {
            Demograf.allFilters['Percentage Other Language'].lower = data.from;
            Demograf.allFilters['Percentage Other Language'].upper = data.to;
        },
        onChange: function(data) {
            Demograf.allFilters['Percentage Other Language'].lower = data.from;
            Demograf.allFilters['Percentage Other Language'].upper = data.to;
            updateMap();
        }

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
                            //(self.regionInfo[key])['Housing Cost'] = (data[i]);

                            for (var k in data[i]) {
                                self.regionInfo[key][k] = data[i][k];
                            }

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
                            (self.regionInfo[key])['Percentage High School'] = (data[i])['Percentage High School'];
                            (self.regionInfo[key])['Percentage Bachelor Degree'] = (data[i])['Percentage Bachelor Degree'];
                            (self.regionInfo[key])['Percentage Associate Degree'] = (data[i])['Percentage Associate Degree'];
                            (self.regionInfo[key])['Percentage Master Degree'] = (data[i])['Percentage Master Degree'];
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
                            //(self.regionInfo[key])['Age Population'] = (data[i]);

                            for (var k in data[i]) {
                                self.regionInfo[key][k] = data[i][k];
                            }

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
                            //(self.regionInfo[key])['Gender Population'] = (data[i]);

                            for (var k in data[i]) {
                                self.regionInfo[key][k] = data[i][k];
                            }

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
                            //(self.regionInfo[key])['Race Population'] = (data[i]);

                            for (var k in data[i]) {
                                self.regionInfo[key][k] = data[i][k];
                            }

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
                            //(self.regionInfo[key])['Public Programs'] = (data[i]);

                            for (var k in data[i]) {
                                self.regionInfo[key][k] = data[i][k];
                            }

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
                            (self.regionInfo[key])['Percentage Married'] = (data[i])['Percentage Married'];
                            (self.regionInfo[key])['Percentage Seperated'] = (data[i])['Percentage Seperated'];
                            (self.regionInfo[key])['Percentage Widowed'] = (data[i])['Percentage Widowed'];
                            (self.regionInfo[key])['Percentage Divorced'] = (data[i])['Percentage Divorced'];
                            break;
                        }
                    }
                }
            }
        });

        $.getJSON("/delphi_languages", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            (self.regionInfo[key])['Percentage Other Language'] = (data[i])['Percentage Other Language'];
                            break;
                        }
                    }
                }
            }
        });

        $.getJSON("/delphi_rental_statistics", function(data) {
            for (var i = 0; i < data.length; ++i) {
                for (var key in self.regionInfo) {
                    if (self.regionInfo.hasOwnProperty(key)) {

                        // if current data Area matches current Region area
                        if (key == data[i].Area) {
                            (self.regionInfo[key])['Median Contract Rent'] = (data[i])['Median contract rent'];
                            break;
                        }
                    }
                }
            }
        });

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
                    //console.log(geography.properties.name);
                    open_side_menu(geography.properties.name);
                });
            }
        });

    };

    self.allFilters = {
        "Median Income": {},
        "Percentage Unemployed": {},
        "Percentage With SNAP": {},
        "Percentage With Cash Assistance": {},
        "Percentage Below Poverty": {},
        "Median House Value": {},
        "Median Contract Rent": {},
        "Percentage Bachelor Degree": {}
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
        d3.select("path#Vista").style("fill", "#000000");
    });

    console.log(Demograf.regionInfo);

});
