//var adjusted_width = limitant * 940
var adjusted_width = "100%";
//var adjusted_height = limitant * 626
var adjusted_height = 1000;



var pathData = "./images/type/";
var selectedYearLeft = "2016";
var selectedYearRight = "2017";

function startVis(selectedYearLeft, selectedYearRight){
  slider = new juxtapose.JXSlider('#swipeYear',
  [
    {
      src: pathData+selectedYearLeft+".png",
      label: selectedYearLeft,
    },
    {
      src: pathData+selectedYearRight+".png",
      label: selectedYearRight,
    }
  ],
  {
    animate: true,
    showLabels: true,
    startingPosition: "46%",
    makeResponsive: true
  });
}
  
function clearVis(){
  d3.select("#swipeYear").html("");
}

startVis(selectedYearLeft, selectedYearRight);

d3.select("#yearSelectorLeft")
  .on("change", function() {
    selectedYearLeft = eval(d3.select(this).property('value'));
    clearVis();
    startVis(selectedYearLeft, selectedYearRight);
  });

d3.select("#yearSelectorRight")
  .on("change", function() {
    selectedYearRight = eval(d3.select(this).property('value'));
    clearVis();
    startVis(selectedYearLeft, selectedYearRight);
  });