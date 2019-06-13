
//var adjusted_width = limitant * 940
var adjusted_width = 1250;
//var adjusted_height = limitant * 626
var adjusted_height = 1000;



var pathData = "../images/type/";
var selectedYearFront = "2017";
var selectedYearBack = "2016";
var opacitySelected = 0.5;
var squareWidth = 100;
function startVis(selectedYearFront, selectedYearBack, opacitySelected){

  var zoom = d3.zoom()
    .scaleExtent([1,1.2])
    .translateExtent([[0,0],[600,900]])
    .on("zoom", zoomed);

  var svg = d3.select("#juxtaposeYear")
  .append("svg")
  .attr("id", "svg")
  .attr("width", adjusted_width)
  .attr("height", adjusted_height)
  
  var svg2 = d3.select("#juxtaposeYear")
  .append("svg")
  .attr("id", "svg2")
  .attr("width", adjusted_width)
  .attr("height", adjusted_height);




  var imgs = svg.selectAll("image").data([0]);

    imgs.enter()
    .append("svg:image")
    .attr("id", "imageBack")
    .attr("xlink:href", pathData+selectedYearBack+'.png')
    .attr("width", adjusted_width)
    .attr("height", "100%")
    .style("opacity", 1)
    .call(zoom);

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
    .attr("opacity", 1)
    .style("fill", "white")
    
    // svg.append("circle")
    //   .attr("id", "lense")
    //   .attr("cx", 500)
    //   .attr("cy", 30)
    //   .attr("r", 15)
    //   .attr("fill", "transparent")
    //   .attr("stroke", "black")
    //   .attr("opacity","0.75")
    //   .attr("stroke-width", "3")
    
    svg.append("rect")
    .attr("id", "lense")
    .attr("x", 500)
    .attr("y", 30)
    .attr("width", squareWidth)
    .attr("height",squareWidth)
    .attr("fill", "transparent")
    .attr("stroke", "black")
    .attr("opacity","0.75")
    .attr("stroke-width", "3")



  
  function zoomed() {
      // svg.attr("transform",d3.event.transform);
      // svg2.attr("transform", d3.event.transform);
  }

  

  var imgs = svg2.selectAll("image").data([0]);

  imgs.enter()
  .append("svg:image")
  .attr("id", "imageFront")
  .attr("xlink:href", pathData+selectedYearFront+'.png')
  .attr("width", adjusted_width)
  .attr("height", "100%")
  .style("opacity", 1)
  .call(zoom);



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
  .attr("id", "textFront")
  .attr("x",50)
  .attr("y",30)
  .text(selectedYearFront)
  .attr("font-family", "sans-serif")
  .attr("font-size", "25px")
  .attr("text-anchor", "middle")
  .attr("opacity",1)
  .style("fill", "white");

  // svg2.append("circle")
  // .attr("id", "lense2")
  // .attr("cx", 500)
  // .attr("cy", 30)
  // .attr("r", 15)
  // .attr("fill", "transparent")
  // .attr("stroke", "black")
  // .attr("opacity","0.75")
  // .attr("stroke-width", "3")

  svg2.append("rect")
  .attr("id", "lense2")
  .attr("x", 500)
  .attr("y", 30)
  .attr("width", squareWidth)
  .attr("height",squareWidth)
  .attr("fill", "transparent")
  .attr("stroke", "black")
  .attr("opacity","0.75")
  .attr("stroke-width", "3")


  startEvents();
}
  
function clearVis(){
  d3.select("#juxtaposeYear").html("");
}

startVis(selectedYearFront, selectedYearBack, opacitySelected);

function startEvents() {

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

  d3.select("#svg")
  .on("mousemove", function() {

    d3.select("#lense")
    .attr("x", d3.mouse(this)[0] - squareWidth/2)
    .attr("y", d3.mouse(this)[1] - squareWidth/2);
    d3.select("#lense2")
    .attr("x", d3.mouse(this)[0] - squareWidth/2)
    .attr("y", d3.mouse(this)[1] - squareWidth/2);

    // console.log("X: ",d3.mouse(this)[0]);
    // console.log("Y: ", d3.mouse(this)[1]);
  });

  d3.select("#svg2")
  .on("mousemove", function() {

    d3.select("#lense")
    .attr("x", d3.mouse(this)[0] - squareWidth/2)
    .attr("y", d3.mouse(this)[1] - squareWidth/2);
    d3.select("#lense2")
    .attr("x", d3.mouse(this)[0] - squareWidth/2 )
    .attr("y", d3.mouse(this)[1] - squareWidth/2 );

    // console.log("X: ",d3.mouse(this)[0]);
    // console.log("Y: ", d3.mouse(this)[1]);
  });
}