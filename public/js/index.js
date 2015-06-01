var DelphiDemo = DelphiDemo || (function() {
    var self = {};
    /** 
     * Send an ajax request to the server to retrieve delphi db data.
     */
    self.getDelphiData = function() {
        $.getJSON("/delphi_home_value_data", function(data) {
            
            /*var rows = $.map(data, function(item, i) {
                return "<tr><td>" + item.year + "</td><td>" + item.gender + "</td><td>" + item.percentage_of_current_smokers + "</td><td>" + item.number_of_respondents + "</td></tr>";
            }).join("");

            $("#delphi-table").append(rows);
            */

            console.log(data);
        });

        $.getJSON("/delphi_housing_cost_data", function(data) {

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
