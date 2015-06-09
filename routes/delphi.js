var pg = require('pg');
var dotenv = require('dotenv');
dotenv.load();

//connect to database
var conString = process.env.DELPHI_CONNECTION_URL;

exports.getHomeValue = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Median house value" ' +
            'FROM hhsa_san_diego_demographics_home_value_med_2012_norm';
        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });

            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getHousingCost = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Percent of Household Income on Housing <20% (Average)", ' +
            '"Percent of Household Income on Housing 20-29% (Average)", ' +
            '"Percent of Household Income on Housing  >30% (Average)" ' +
            'FROM hhsa_san_diego_demographics_housing_costs_2012';
        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });

            for (var i = 0; i < result.rows.length; ++i) {
                result.rows[i].Area = checkAreaName(result.rows[i].Area);
            }

            res.end(JSON.stringify(result.rows));
        });
    });
};


exports.getMedianIncome = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Median Household Income" ' +
            'FROM hhsa_san_diego_demographics_median_income_2012_norm';
        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getEmploymentStatus = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Employment Status", "Population" ' +
            'FROM hhsa_san_diego_demographics_employment_status_2012_norm ' +
            'WHERE "Employment Status" = \'Labor Force (Residents)\' ' +
            'OR "Employment Status" = \'Civilian Unemployed (Residents)\'';
        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });

            var filteredResults = [];
            for (var i = 0; i < result.rows.length; i += 2) {
                var areaObj = {
                    'Area': checkAreaName(result.rows[i].Area),
                    'Percentage Unemployed': result.rows[i + 1].Population / result.rows[i].Population
                };

                filteredResults.push(areaObj);
            }

            res.end(JSON.stringify(filteredResults));
        });
    });

};

exports.getEducation = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Education", "Population" ' +
            'FROM hhsa_san_diego_demographics_education_2012_norm ' +
            'WHERE "Education" = \'Bachelor\'\'s degree (age 25 and older)\' ' +
            'OR "Education" = \'Any (Population 25 and older)\'';

        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });

            var filteredResults = [];
            for (var i = 0; i < result.rows.length; i += 2) {
                var areaObj = {
                    'Area': checkAreaName(result.rows[i].Area),
                    'Percentage Educated': result.rows[i + 1].Population / result.rows[i].Population
                };

                filteredResults.push(areaObj);
            }

            res.end(JSON.stringify(filteredResults));

        });
    });
};

exports.getPopulationByAge = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Age", "Population" ' +
            'FROM hhsa_san_diego_demographics_county_popul_by_age_2012_norm';

        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });

            var filteredResults = [];
            for (var i = 1; i < result.rows.length; i += 7) {
                var areaObj = {
                    'Area': checkAreaName(result.rows[i].Area)
                };

                var largestPop = 0;
                var largestAge = "";
                for (var j = 0; j < 6; ++j) {
                    // check if new race population is largest
                    if (result.rows[i + j].Population > largestPop) {
                        largestPop = result.rows[i + j].Population;
                        largestAge = result.rows[i + j].Age;
                    }
                    areaObj['' + result.rows[i + j].Age + ' Population'] = result.rows[i + j].Population;
                }
                areaObj['Largest Age'] = largestAge;
                filteredResults.push(areaObj);
            }

            res.end(JSON.stringify(filteredResults));
        });
    });
};

exports.getPopulationByGender = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_county_popul_by_gender_2012_norm';
        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });

            var filteredResults = [];
            for (var i = 1; i < result.rows.length; i += 3) {

                var areaObj = {
                    'Area': checkAreaName(result.rows[i].Area)
                };

                var largestPop = 0;
                var largestGender = "";
                for (var j = 0; j < 2; ++j) {
                    // check if new race population is largest
                    if (result.rows[i + j].Population > largestPop) {
                        largestPop = result.rows[i + j].Population;
                        largestGender = result.rows[i + j].Gender;
                    }
                    areaObj['' + result.rows[i + j].Gender + ' Population'] = result.rows[i + j].Population;
                }
                areaObj['Largest Gender'] = largestGender;
                filteredResults.push(areaObj);
            }

            res.end(JSON.stringify(filteredResults));
        });
    });
};

exports.getPopulationByRace = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Race", "Population" ' +
            'FROM hhsa_san_diego_demographics_county_popul_by_race_2012_norm';

        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });

            var filteredResults = [];
            for (var i = 1; i < result.rows.length; i += 6) {
                var areaObj = {
                    'Area': checkAreaName(result.rows[i].Area)
                };

                var largestPop = 0;
                var largestRace = "";
                for (var j = 0; j < 5; ++j) {
                    // check if new race population is largest
                    if (result.rows[i + j].Population > largestPop) {
                        largestPop = result.rows[i + j].Population;
                        largestRace = result.rows[i + j].Race;
                    }
                    areaObj['' + result.rows[i + j].Race + ' Population'] = result.rows[i + j].Population;
                }
                areaObj['Largest Race'] = largestRace;
                filteredResults.push(areaObj);
            }

            res.end(JSON.stringify(filteredResults));
        });
    });
};

exports.getPoverty = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Population Type", "Total" ' +
            'FROM hhsa_san_diego_demographics_poverty_2012_norm ' +
            'WHERE "Population Type" = \'Population for whom poverty status is determined\' ' +
            'OR "Population Type" = \'Total population below poverty\'';
        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });

            var filteredResults = [];
            for (var i = 0; i < result.rows.length; i += 2) {
                var areaObj = {
                    'Area': checkAreaName(result.rows[i].Area),
                    'Percentage Below Poverty': result.rows[i + 1].Total / result.rows[i].Total
                };

                filteredResults.push(areaObj);
            }

            res.end(JSON.stringify(filteredResults));
        });
    });
};

exports.getPublicPrograms = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Total Households", "Households With SNAP", "Households With Cash Assistance" ' +
            'FROM hhsa_san_diego_demographics_public_programs_2012';
        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });

            var filteredResults = [];
            for (var i = 0; i < result.rows.length; ++i ) {
                var areaObj = {
                    'Area': checkAreaName(result.rows[i].Area),
                    'Percentage With SNAP': (result.rows[i])['Households With SNAP'] / (result.rows[i])['Total Households'],
                    'Percentage With Cash Assistance': (result.rows[i])['Households With Cash Assistance'] / (result.rows[i])['Total Households']
                };

                filteredResults.push(areaObj);
            }

            console.log(result.rows);
            res.end(JSON.stringify(filteredResults));
        });
    });
};

exports.getOccupationalIndustry = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_occupat_industry_2012_norm';
        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getMaritalStatus = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Marital Status", "Total" ' +
            'FROM hhsa_san_diego_demographics_marital_status_2012_norm ' +
            'WHERE "Marital Status" = \'Any (Total Population 15+)\' ' +
            'OR "Marital Status" = \'Single\'';
        client.query(query, function(err, result) {

            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });

            var filteredResults = [];
            for (var i = 0; i < result.rows.length; i += 2) {
                var areaObj = {
                    'Area': checkAreaName(result.rows[i].Area),
                    'Percentage Single': result.rows[i + 1].Total / result.rows[i].Total
                };

                filteredResults.push(areaObj);
            }

            res.end(JSON.stringify(filteredResults));
        });
    });
};

exports.getLanguages = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Languages Spoken", "Population" ' +
            'FROM hhsa_san_diego_demographics_languages_2012_norm ' +
            'WHERE "Languages Spoken" = \'Speak any language (Total population age 5 years and older)\' ' +
            'OR "Languages Spoken" = \'Speak other language - Total\'';
        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });

            var filteredResults = [];
            for (var i = 0; i < result.rows.length; i += 2) {
                var areaObj = {
                    'Area': result.rows[i].Area,
                    'Percentage Other Language': result.rows[i + 1].Population / result.rows[i].Population
                };

                filteredResults.push(areaObj);
            }

            res.end(JSON.stringify(filteredResults));
        });
    });
};

exports.getRentalStatistics = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT "Area", "Median contract rent" ' +
            'FROM hhsa_san_diego_demographics_rental_statistics_med_2012_norm';
        client.query(query, function(err, result) {
            if (err) return console.log(err);

            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

var checkAreaName = function(area) {

    var retName = area;

    switch (area) {
        case "Central SD":
            retName = "Central San Diego";
            break;
        case "North SD":
            retName = "North San Diego";
            break;
        case "Southeast SD":
            retName = "Southeastern San Diego";
            break;
        case "Anza-Borrego Springs":
            retName = "Anza-Borrego";
            break;
        case "Harbison Crest":
            retName = "Harbison-Crest";
            break;
        case "Mid-City":
            retName = "Mid City";
            break;
        default:
            break;
    }

    return retName;
}
