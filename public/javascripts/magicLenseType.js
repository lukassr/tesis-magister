//var adjusted_width = limitant * 940
var adjusted_width = "100%";
//var adjusted_height = limitant * 626
var adjusted_height = 1000;



var pathData = "../images/type/";
var selectedYearFront = "2017";
var selectedYearBack = "2016";
var opacitySelected = 0.5;

// function startVis(selectedYearFront, selectedYearBack, opacitySelected){
//   var svg = d3.select("#magicLenseYear")
//   .append("svg")
//   .attr("width", adjusted_width)
//   .attr("height", adjusted_height);


//   var imgs = svg.selectAll("image").data([0]);

//     //  imgs.enter()
//     // .append("svg:image")
//     // .attr("id", "thumb")
//     // .attr("xlink:href", pathData+selectedYearBack+'.png')
//     // .attr("width", adjusted_width)
//     // .attr("height", adjusted_height)
//     // .style("opacity", 1)

//     // imgs.enter()
//     // .append("svg:image")
//     // .attr("id", "imageFront")
//     // .attr("xlink:href", pathData+selectedYearFront+'.png')
//     // .attr("width", adjusted_width)
//     // .attr("height", adjusted_height)
//     // .style("opacity", opacitySelected);

//     imgs.enter()
//     .append("rect")
//     .attr("x", 15)
//     .attr("y",5)
//     .attr("width", 70)
//     .attr("height", 30)
//     .style("fill", "black")
//     .style("opacity", 0.75);

//     imgs.enter()
//     .append("text")
//     .attr("id", "textBack")
//     .attr("x",50)
//     .attr("y",30)
//     .text(selectedYearBack)
//     .attr("font-family", "sans-serif")
//     .attr("font-size", "25px")
//     .attr("text-anchor", "middle")
//     .attr("opacity", 1)
//     .style("fill", "white");

//     imgs.enter()
//     .append("text")
//     .attr("id", "textFront")
//     .attr("x",50)
//     .attr("y",30)
//     .text(selectedYearFront)
//     .attr("font-family", "sans-serif")
//     .attr("font-size", "25px")
//     .attr("text-anchor", "middle")
//     .attr("opacity", 0)
//     .style("fill", "white");

//     // svg.append("circle")
//     // .attr("id", "lense")
//     // .attr("cx", 500)
//     // .attr("cy", 30)
//     // .attr("r", 60);

// }
  
// function clearVis(){
//   d3.select("#traslucentYear").html("");
// }

// startVis(selectedYearFront, selectedYearBack, opacitySelected);


// // d3.select("#opacity")
// //   .on("input", function() {
// //     opacitySelected = d3.select("#opacity").property("value")/100;
// //     d3.select("#imageFront")
// //     .transition()
// //     .duration(10)
// //     .ease(d3.easeLinear)
// //     .style("opacity", opacitySelected);

// //     d3.select("#textFront")
// //     .transition()
// //     .duration(10)
// //     .ease(d3.easeLinear)
// //     .style("opacity", opacitySelected - 0.1);

// //     d3.select("#textBack")
// //     .transition()
// //     .duration(10)
// //     .ease(d3.easeLinear)
// //     .style("opacity", 1 - opacitySelected - 0.1);
// //   });




d3.select("#yearSelectorFront")
  .on("change", function() {
    selectedYearFront = eval(d3.select(this).property('value'));
    document.getElementById("thumb").setAttribute('data-large-img-url',pathData+selectedYearFront+'.png');
    var evt = new Event(),
    m = new Magnifier(evt);
    m.attach({
      thumb: '#thumb',
      largeWrapper: 'preview',
      mode: 'inside',
      zoom: 1
  });
  });

d3.select("#yearSelectorBack")
  .on("change", function() {
    selectedYearBack = eval(d3.select(this).property('value'));
    document.getElementById("thumb").src=pathData+selectedYearBack+'.png';
  });



//   // d3.select("#magicLenseYear")
//   //   .on("mousemove", function() {

//   //     d3.select("#lense")
//   //     .attr("cx", d3.mouse(this)[0])
//   //     .attr("cy", d3.mouse(this)[1]);

//   //     console.log("X: ",d3.mouse(this)[0]);
//   //     console.log("Y: ", d3.mouse(this)[1]);
//   //   });


document.getElementById("thumb").src=pathData+selectedYearBack+'.png';

document.getElementById("thumb").setAttribute('data-large-img-url',pathData+selectedYearFront+'.png');
var evt = new Event(),
    m = new Magnifier(evt);
    m.attach({
      thumb: '#thumb',
      largeWrapper: 'preview',
      mode: 'inside',
      zoom: 1

  });