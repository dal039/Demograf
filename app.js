//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var dotenv = require('dotenv');
var pg = require('pg');


var app = express();
var router = express.Router();

// declare routes
var index = require('./routes/index');
var delphi = require('./routes/delphi');

//client id and client secret here, taken from .env
dotenv.load();

//connect to database
var conString = process.env.DELPHI_CONNECTION_URL;

//Configures the Template engine
app.engine('handlebars', handlebars({
    defaultLayout: 'layout'
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
}));

//set environment ports and start application
app.set('port', process.env.PORT || 3000);

// middleware function that occurs every time a request is made
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

//routes
router.get('/', index.view);

// routes that will pull all delphi data and parse them in their respective 
// functions in delphi.js
router.get('/delphi_home_value', delphi.getHomeValue);
router.get('/delphi_housing_cost', delphi.getHousingCost);
router.get('/delphi_median_income', delphi.getMedianIncome);
router.get('/delphi_employment_status', delphi.getEmploymentStatus);
router.get('/delphi_education', delphi.getEducation);
router.get('/delphi_population_by_age', delphi.getPopulationByAge);
router.get('/delphi_population_by_gender', delphi.getPopulationByGender);
router.get('/delphi_population_by_race', delphi.getPopulationByRace);
router.get('/delphi_poverty', delphi.getPoverty);
router.get('/delphi_public_programs', delphi.getPublicPrograms);
router.get('/delphi_occupational_industry', delphi.getOccupationalIndustry);
router.get('/delphi_marital_status', delphi.getMaritalStatus);
router.get('/delphi_languages', delphi.getLanguages);
router.get('/delphi_rental_statistics', delphi.getRentalStatistics);


app.use('/', router);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
