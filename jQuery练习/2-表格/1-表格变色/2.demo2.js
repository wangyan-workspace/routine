$(function(){
    $("tbody>tr:odd").addClass("odd");
    $("tbody>tr:even").addClass("even");
    $("tr:contains('王五')").addClass("selected");
});