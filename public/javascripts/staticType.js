var limitant = Math.min(window.innerWidth / 940, window.innerHeight / 626)
//var adjusted_width = limitant * 940
var adjusted_width = 1500;
//var adjusted_height = limitant * 626
var adjusted_height = 1000;

var margin = { top: 0, right: 0, bottom: 0, left: 0 },
  width = adjusted_width,
  height = adjusted_height,
  centered,
  previousCentered,
  eventGrid,
  cellGrid,
  labelGrid,
  cellSize,
  subCellSize;

var pathData = "./data/type/";
var selectedYear = "2017";


const categories_mapa = {
  1: "Automovil",
  2: "Station Wagon",
  3: "Camioneta",
  4: "Camiones",
  5: "Furgon",
  6: "Todo Terreno",
  7: "Minibus",
  8: "Semiremolques",
  9: "Motocicletas",
  10: "Buses y Taxibuses"
};

var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

var categories = {
"Automovil": colorScale(0),
"Station Wagon": colorScale(1),
"Camioneta": colorScale(2),
"Camiones": colorScale(3),
"Furgon": colorScale(4),
"Todo Terreno": colorScale(5),
"Minibus": colorScale(6),
"Semiremolques": colorScale(7),
"Motocicletas": colorScale(8),
 "Buses y Taxibuses": colorScale(9)
};

var zoomLevel = 4;
var shrickLevelWidth = 1 / 5;
var shrickLevelHeight = 1;

var catsPerState = {};
var totalCatsState = {};

var myScale = d3.scaleLinear().range([0, 10]);


var seed = 0;
function random() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
  seed++;
  return seed;
}

function startVis(fileData) {

  var svg = d3.select("#vis")
  .append("svg")
  .attr("width", adjusted_width)
  .attr("height", adjusted_height);

  

// draw gridlines
var gridData;
[gridData, cellSize] = getGridData(12, 8, width, height);
console.log("gridData", gridData);
console.log("cellSize", cellSize);
cellGrid = svg
  .append("g")
  .attr("class", "cellGrid")
  // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .selectAll(".row")
  .data(gridData)
  .enter()
  .append("g")
  .attr("class", "row")
  .selectAll(".cell")
  .data(function(d) {
    return d;
  })
  .enter()
  .append("g")
  .attr("class", d => "cell" + " x" + d.x + " y" + d.y);
// .attr("transform", d => "translate(" + d.x + "," + d.y + ")")

d3.csv(fileData, stateData => {
  var stateOrderedData = {};
  stateData.forEach(row => {
    if (stateOrderedData[row.state]) {
      stateOrderedData[row.state].push(row);
    } else {
      stateOrderedData[row.state] = [row];
    }
  });


  Object.keys(stateOrderedData).forEach(state => {
    
    var aux_total = 0;
    stateOrderedData[state].forEach(total => {
      aux_total += parseInt(total.category)
    });
    aux_total = 100/aux_total;
    stateOrderedData[state].forEach(total => {
      total.category = Math.round(total.category * aux_total)+1;
    });
  });
  console.log("stateOrderedData",stateOrderedData);


  d3.csv("./grid.csv", data => {
    //console.log(data)
    // labelGrid overlays label on grid
    function drawSquares() {
      var subGridData;
      [_, subCellSize] = getGridData(10, 10, cellSize, cellSize);
      labelGrid = svg
        .append("g")
        .attr("class", "labelGrid")
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .each(d => {
          d.x = (d.col) * cellSize + cellSize / 2;
          d.y = (d.row) * cellSize + (cellSize / 2 + 5);
        })
        .attr("x", d => d.x - 3)
        .attr("y", d => d.y)
        .style("text-anchor", "middle")
        .text(d => d.code)
        .attr("font-family", "sans-serif")
        .attr("font-size", "13px")
        .style("font-weight", "bold")
        .attr("opacity", "0.75")
        .attr("class", d => "label " + d.code)
        .each(d => {
          subGridData = getGridData2(
            10,
            10,
            cellSize,
            cellSize,
            d,
            stateOrderedData
          );
          d3.select(
            ".cell.x" +
              (d.x - cellSize / 2 + 1) +
              ".y" +
              (d.y - (cellSize / 2 + 5) + 1)
          )
            .attr("class", "state " + d.code)
            .selectAll(".subrow")
            .data(subGridData)
            .enter()
            .append("g")
            .attr("class", "subrow")
            .selectAll(".subcell")
            .data(d => d)
            .enter()
            .append("rect")
            // .on("click", clicked)
            .attr("class", "subcell")
            .each(e => {
              const realx = e.x + d.x - cellSize / 2 + 1;
              e.realx = realx;
              const realy = d.y + e.y - (cellSize / 2 + 5) + 1;
              e.realy = realy;
            })
            .attr("x", e => e.realx - 3)
            .attr("y", e => e.realy - 1)
            .attr("width", subCellSize)
            .attr("height", subCellSize)
            .style("fill", e => e.color)
            .style("opacity", "0.7");
        });
    }
    drawSquares();

    // draw transparent rectangles on top to read events
    eventGrid = svg
      .append("g")
      .attr("class", "eventGrid")
      .selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => (d.col) * cellSize)
      .attr("y", d => (d.row) * cellSize)
      .attr("width", cellSize - 4)
      .attr("height", cellSize - 4)
      .style("stroke","black")
      .attr("stroke-width", 2)
      .style("opacity", "0.25")
      .style("fill","transparent")
      // .on("mouseover", d => {
      //   console.log(d)
      // });
      .on("click", d => {
        console.log(d);
      })
      // .on("click", clicked);
  });
});
createLegend(svg);
}

function clearVis(){
  d3.select("#vis").html("");
}
// function that generates a nested array for square grid
function getGridData(ncol, nrow, width, height) {
  var cellSize = calcCellSize(width, height, ncol, nrow);

  var gridData = [];
  var xpos = 1; // starting xpos and ypos at 1 so the stroke will show when we make the grid below
  var ypos = 1;

  // iterate for rows
  for (var row = 0; row < nrow; row++) {
    gridData.push([]);

    // iterate for cells/columns inside each row
    for (var col = 0; col < ncol; col++) {
      gridData[row].push({
        x: xpos,
        y: ypos
      });

      // increment x position (moving over by 50)
      xpos += cellSize;
    }

    // reset x position after a row is complete
    xpos = 1;
    // increment y position (moving down by 50)
    ypos += cellSize;
  }
  return [gridData, cellSize];
}

function myIndex(cats, category) {
  for (var curindex = 0; curindex < cats.length; curindex++) {
    let elem = cats[curindex];
    if (elem.catName === category) {
      // console.log(true, elem.catName, category)
      // console.log("a", curindex);
      return curindex;
    }
    if (curindex >= 4) {
      return 4;
    }
  }
  return 4;
}

var logged = false;
function getGridData2(ncol, nrow, width, height, data, stateData) {
  // console.log("stateData, ", stateData);
  // console.log("data, ", data);
  var scode = stateData[data.code];
  // console.log("scode", scode);
  if (stateData[data.code] == null) {
    scode = [];
  }

  catsPerState[data.code] = scode.sort(function(a, b) {
    return a.catId - b.catId;
  });
  console.log("data.code", data.code);
  console.log("CATSPRERSTATE", catsPerState);

  var colorArray = [];
  scode.forEach(row => {
    if (!totalCatsState[data.code]) {
      totalCatsState[data.code] = parseInt(row.category);
    } else {
      totalCatsState[data.code] += parseInt(row.category);
    }
    for (var i = 0; i < row.category; i++) {
      colorArray.push(row);
    }
  });

  

  console.log("SCODE",scode)
  console.log("totalCatState",totalCatsState);
  console.log("colorarray.length", colorArray.length);

  if (!logged) {
    logged = true;
    // console.log(data);
    // console.log(scode);
    // console.log(colorArray);
  }




  var cellSize = calcCellSize(width, height, ncol, nrow);
  console.log("cellsize", cellSize);


  var gridData = [];
  var xpos = 1; // starting xpos and ypos at 1 so the stroke will show when we make the grid below
  var ypos = 1;
  
  // iterate for rows
  for (var row = 0; row < nrow; row++) {
    gridData.push([]);
    console.log("colorArray", colorArray);

    // iterate for cells/columns inside each row
    for (var col = 0; col < ncol; col++) {
      if ((colorArray.length > 0)) {
        // var color = colorArray[Math.min(col, colorArray.length - 1)];   
        var color = colorArray.pop();
        // var color = colorArray[Math.floor(col/(10)*(colorArray.length))];   
        // var color = colorArray[Math.floor(Math.random() * colorArray.length)];   
        console.log("color", color);    
      var indexRow = myIndex(
        catsPerState[data.code],
        categories_mapa[color.catId]
      );
      // console.log(indexRow);
      gridData[row].push({
        x: xpos,
        y: ypos,
        color: categories[categories_mapa[color.catId]],
        cat: categories_mapa[color.catId],
        index: indexRow
      });
    }
      // increment x position (moving over by 50)
      xpos += cellSize;
    }
    // reset x position after a row is complete
    xpos = 1;
    // increment y position (moving down by 50)
    ypos += cellSize;
  }
  return gridData;
}

// function to calculate grid cell size based on width and height of svg
function calcCellSize(w, h, ncol, nrow) {
  // leave tiny space in margins
  var gridWidth = w - 2;
  var gridHeight = h - 2;
  var cellSize;

  // calculate size of cells in columns across
  var colWidth = Math.floor(gridWidth / ncol);
  // calculate size of cells in rows down
  var rowWidth = Math.floor(gridHeight / nrow);

  // take the smaller of the calculated cell sizes
  if (colWidth <= rowWidth) {
    cellSize = colWidth;
  } else {
    cellSize = rowWidth;
  }
  return cellSize;
}

startVis(pathData+selectedYear+".csv")
d3.select('#yearSelector')
  .on('change', function() {
    selectedYear = eval(d3.select(this).property('value'));
    clearVis();
    startVis(pathData+selectedYear+".csv")
});


d3.select("#download")
  .on('click', function() {
    saveSvgAsPng(document.getElementsByTagName("svg")[0], selectedYear+'.png', {scale: 1, backgroundColor: "#FFFFFF"});
  });



function createLegend(svg) {
  var i = 1;
  var size = 15;
  for (const [key, value] of Object.entries(categories)) {
    svg.append("rect")
    .attr("x", adjusted_height+250)
    .attr("y", 50 + i*(size*2))
    .attr("width", size)
    .attr("height", size)
    .style("fill", value);
    
    svg.append("text")
    .attr("x", adjusted_height + 270)
    .attr("y", (50 + i*(size*2)) +size/1.3)
    .style("fill", value)
    .text(key)
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .attr("font-family", "sans-serif")
    i++;
  }
}