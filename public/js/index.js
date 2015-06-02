var DelphiDemo = DelphiDemo || (function() {
    var self = {};
    /** 
     * Send an ajax request to the server to retrieve delphi db data.
     */
    self.getDelphiData = function() {
        $.getJSON("/delphi_home_value", function(data) {
            
            /*var rows = $.map(data, function(item, i) {
                return "<tr><td>" + item.year + "</td><td>" + item.gender + "</td><td>" + item.percentage_of_current_smokers + "</td><td>" + item.number_of_respondents + "</td></tr>";
            }).join("");

            $("#delphi-table").append(rows);
            */

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
