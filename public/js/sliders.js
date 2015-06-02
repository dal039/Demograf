/////////////////////sliders/////////////////////
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
        force_edges: true
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
