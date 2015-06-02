var pg = require('pg');
var dotenv = require('dotenv');
dotenv.load();

//connect to database
var conString = process.env.DELPHI_CONNECTION_URL;

exports.getHomeValue = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_home_value_abs_2012_norm';
        client.query(query, function(err, result) {
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

        var query = 'SELECT * FROM hhsa_san_diego_demographics_housing_costs_2012';
        client.query(query, function(err, result) {
            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};


exports.getMedianIncome = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_median_income_2012_norm';
        client.query(query, function(err, result) {
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

        var query = 'SELECT * FROM hhsa_san_diego_demographics_employment_status_2012_norm';
        client.query(query, function(err, result) {
            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getEducation = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_education_2012_norm';
        client.query(query, function(err, result) {
            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getPopulationByAge = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_county_popul_by_age_2012_norm';
        client.query(query, function(err, result) {
            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getPopulationByGender = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_county_popul_by_gender_2012_norm';
        client.query(query, function(err, result) {
            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getPopulationByRace = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_county_popul_by_race_2012_norm';
        client.query(query, function(err, result) {
            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getPoverty = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_poverty_2012_norm';
        client.query(query, function(err, result) {
            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getPublicPrograms = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_public_programs_2012';
        client.query(query, function(err, result) {
            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getOccupationalIndustry = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_occupat_industry_2012_norm';
        client.query(query, function(err, result) {
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

        var query = 'SELECT * FROM hhsa_san_diego_demographics_marital_status_2012_norm';
        client.query(query, function(err, result) {
            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getLanguages = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_languages_2012_norm';
        client.query(query, function(err, result) {
            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

exports.getRentalStatistics = function(req, res) {

    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_rental_statistics_med_2012_norm';
        client.query(query, function(err, result) {
            // return the client to the connection pool for other requests to reuse
            done();

            res.writeHead("200", {
                'content-type': 'application/json'
            });
            res.end(JSON.stringify(result.rows));
        });
    });
};

