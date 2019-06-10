//var adjusted_width = limitant * 940
var adjusted_width = "110%";
//var adjusted_height = limitant * 626
var adjusted_height = 1000;



var pathData = "../images/type/";
var selectedYearFront = "2017";
var selectedYearBack = "2016";
var opacitySelected = 0.5;

function startVis(selectedYearFront, selectedYearBack, opacitySelected){
  var svg = d3.select("#traslucentYear")
  .append("svg")
  .attr("width", adjusted_width)
  .attr("height", adjusted_height);


  var imgs = svg.selectAll("image").data([0]);

    imgs.enter()
    .append("svg:image")
    .attr("id", "imageBack")
    .attr("xlink:href", pathData+selectedYearBack+'.png')
    .attr("width", adjusted_width)
    .attr("height", adjusted_height)
    .style("opacity", 1)

    d3.select("#left").text(selectedYearBack);


    imgs.enter()
    .append("svg:image")
    .attr("id", "imageFront")
    .attr("xlink:href", pathData+selectedYearFront+'.png')
    .attr("width", adjusted_width)
    .attr("height", adjusted_height)
    .style("opacity", opacitySelected);

    d3.select("#right").text(selectedYearFront);
    d3.select("#switch").text("Change to "+selectedYearFront);

    imgs.enter()
    .append("rect")
    .attr("x", 15)
    .attr("y",5)
    .attr("width", 70)
    .attr("height", 30)
    .style("fill", "black")
    .style("opacity", 0.75);

    imgs.enter()
    .append("text")
    .attr("id", "textBack")
    .attr("x",50)
    .attr("y",30)
    .text(selectedYearBack)
    .attr("font-family", "sans-serif")
    .attr("font-size", "25px")
    .attr("text-anchor", "middle")
    .attr("opacity", 0.9 - opacitySelected)
    .style("fill", "white");

    imgs.enter()
    .append("text")
    .attr("id", "textFront")
    .attr("x",50)
    .attr("y",30)
    .text(selectedYearFront)
    .attr("font-family", "sans-serif")
    .attr("font-size", "25px")
    .attr("text-anchor", "middle")
    .attr("opacity",opacitySelected)
    .style("fill", "white");



}
  
function clearVis(){
  d3.select("#traslucentYear").html("");
}

startVis(selectedYearFront, selectedYearBack, opacitySelected);


d3.select("#opacity")
  .on("input", function() {
    opacitySelected = d3.select("#opacity").property("value")/100;
    d3.select("#imageFront")
    .transition()
    .duration(10)
    .ease(d3.easeLinear)
    .style("opacity", opacitySelected);

    d3.select("#textFront")
    .transition()
    .duration(10)
    .ease(d3.easeLinear)
    .style("opacity", opacitySelected - 0.1);

    d3.select("#textBack")
    .transition()
    .duration(10)
    .ease(d3.easeLinear)
    .style("opacity", 1 - opacitySelected - 0.1);
  });


  d3.select("#switch")
  .on("click", function () {
    if (d3.select(this).text() == "Change to "+selectedYearBack) {
      d3.select(this).text("Change to "+selectedYearFront)

      d3.select("#imageFront")
      .transition()
      .duration(10)
      .ease(d3.easeLinear)
      .style("opacity", 0.1);

      d3.select("#textFront")
      .transition()
      .duration(10)
      .ease(d3.easeLinear)
      .style("opacity", 0.1);

      d3.select("#textBack")
      .transition()
      .duration(10)
      .ease(d3.easeLinear)
      .style("opacity", 99);
      d3.select("#opacity")["_groups"][0][0]["value"] = 0;


    }
    else {
      d3.select(this).text("Change to "+selectedYearBack)
      d3.select("#opacity")["_groups"][0][0]["value"] = 100;

      d3.select("#imageFront")
      .transition()
      .duration(10)
      .ease(d3.easeLinear)
      .style("opacity", 99);

      d3.select("#textFront")
      .transition()
      .duration(10)
      .ease(d3.easeLinear)
      .style("opacity", 99);

      d3.select("#textBack")
      .transition()
      .duration(10)
      .ease(d3.easeLinear)
      .style("opacity", 0.1);
    }
  })


d3.select("#yearSelectorFront")
  .on("change", function() {
    selectedYearFront = eval(d3.select(this).property('value'));
    clearVis();
    startVis(selectedYearFront, selectedYearBack, opacitySelected);
  });

d3.select("#yearSelectorBack")
  .on("change", function() {
    selectedYearBack = eval(d3.select(this).property('value'));
    clearVis();
    startVis(selectedYearFront, selectedYearBack, opacitySelected);
  });