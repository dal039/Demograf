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
        
        $.getJSON("/delphi_home_value", function(data) {
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
        });

    };


    /** 
     * initialize 
     */
    self.init = function() {
        self.getDelphiData();
    };

    return self;
})();

$(document).ready(function() {

    DelphiDemo.init();
});
