var pg = require('pg');
var dotenv = require('dotenv');
dotenv.load();

//connect to database
var conString = process.env.DELPHI_CONNECTION_URL;

exports.getHomeValueData = function(req, res) {
    // initialize connection pool 
    pg.connect(conString, function(err, client, done) {
        if (err) return console.log(err);

        var query = 'SELECT * FROM hhsa_san_diego_demographics_home_value_2012';
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

exports.getHousingCostData = function(req, res) {

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

}
