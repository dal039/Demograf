/////////////////////sliders/////////////////////
//Monthly Income
$(function() {
    $("#range1").ionRangeSlider({
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

//Home Value
$(function() {
    $("#range2").ionRangeSlider({
        type: "double",
        min: 190000,
        max: 730000,

        step: 10000,
        prettify_enabled: true,
        prefix: "$",

        grid_snap: true,
        force_edges: true
    });
});

//Median Contract Rent
$(function() {
    $("#range3").ionRangeSlider({
        type: "double",
        min: 790,
        max: 2000,

        step: 100,
        prettify_enabled: true,
        prefix: "$",
        max_postfix: "+",
        grid: true,
        grid_snap: true,
        force_edges: true
    });
});


//Employment status
$(function() {
    $("#range4").ionRangeSlider({
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
    $("#range5").ionRangeSlider({
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


//Single %
$(function() {
    $("#range6").ionRangeSlider({
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
    $("#range7").ionRangeSlider({
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

