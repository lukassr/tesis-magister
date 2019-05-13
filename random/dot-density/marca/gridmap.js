var limitant = Math.min(window.innerWidth / 940, window.innerHeight / 626)
//var adjusted_width = limitant * 940
var adjusted_width = 1300;
//var adjusted_height = limitant * 626
var adjusted_height = 1300;
var margin = { top: 0, right: 0, bottom: 0, left: 0},
  width = adjusted_width,
  height = adjusted_height,
  centered,
  previousCentered,
  eventGrid,
  cellGrid,
  labelGrid,
  cellSize,
  subCellSize;

var fileData = "./data/2013.csv";

const categories_mapa = {
  1: "Blanco",
  2: "Plateado",
  3: "Gris",
  4: "Rojo",
  5: "Negro",
  6: "Azul",
  7: "Beige",
  8: "Verde",
  9: "Celeste"
};
var colorScale = d3.scaleOrdinal(d3.schemePaired);
console.log("colorScale(0)",colorScale(0));
var categories = {
  // "Blanco": "#e5e5e5",
  // "Plateado": "#d8d8d8",
  // "Gris": "#999999",
  // "Rojo": colorScale(5),
  // "Negro": "000",
  // "Azul": colorScale(1),
  // "Beige": "#f6e58d",
  // "Verde": colorScale(3),
  // "Celeste": colorScale(0)
  "Blanco":colorScale(0) , 
  "Plateado":colorScale(1) ,
  "Gris":colorScale(2) ,
  "Rojo":colorScale(3) ,
  "Negro":colorScale(4) ,
  "Azul":colorScale(5) ,
  "Beige":colorScale(6) ,
  "Verde":colorScale(7) ,
  "Celeste":colorScale(8) ,
};

var zoomLevel = 4;
var shrickLevelWidth = 1 / 5;
var shrickLevelHeight = 1;

var catsPerState = {};
var totalCatsState = {};

var myScale = d3.scaleLinear().range([0, 10]);

var svg = d3
  .select("#vis")
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

  d3.csv("grid.csv", data => {
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
        .attr("font-size", "11px")
        .attr("opacity", "0.7")
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
            .attr("x", e => e.realx)
            .attr("y", e => e.realy)
            .attr("width", subCellSize)
            .attr("height", subCellSize)
            .style("fill", e => e.color)
            .style("opacity", "0.75");
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
      .attr("x", d => (d.col) * cellSize )
      .attr("y", d => (d.row) * cellSize )
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
  console.log("stateData, ", stateData);
  console.log("data, ", data);
  var scode = stateData[data.code];
  console.log("scode", scode);
  if (stateData[data.code] == null) {
    scode = [];
  }

  catsPerState[data.code] = scode.sort(function(a, b) {
    return b.category - a.category;
  });

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
  console.log("colorArray", colorArray);


  if (!logged) {
    logged = true;
    // console.log(data);
    // console.log(scode);
    // console.log(colorArray);
  }

  var cellSize = calcCellSize(width, height, ncol, nrow);

  var gridData = [];
  var xpos = 1; // starting xpos and ypos at 1 so the stroke will show when we make the grid below
  var ypos = 1;

  // iterate for rows
  for (var row = 0; row < nrow; row++) {
    gridData.push([]);

    // iterate for cells/columns inside each row
    for (var col = 0; col < ncol; col++) {
      if (colorArray.length > 0){
        var color = colorArray[Math.floor(Math.random() * colorArray.length)];
      
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

// function clicked(selected) {
//   // console.log(selected);
//   var x, y, k;

//   if (selected && centered !== selected) {
//     x = selected.x;
//     y = selected.y;
//     k = zoomLevel;
//     previousCentered = centered;
//     centered = selected;
//   } else {
//     x = width / 2;
//     y = height / 2;
//     k = 1;
//     previousCentered = centered;
//     centered = null;
//   }

//   myScale.domain([0, 100]);

//   shrickLevelWidth = myScale(1);

//   d3.selectAll(`.label:not(.${selected.code})`)
//     .style("font-size", "20px")
//     .attr("y", d => d.y);

//   d3.selectAll(`.label.${selected.code}`)
//     .style("font-size", "10px")
//     .attr("y", d => d.y - 5 * (subCellSize * shrickLevelHeight)-5);

//   if (previousCentered) {
//     d3.select(`.state.${previousCentered.code}`)
//       .select(".y")
//       .remove();

//     d3.select(`.state.${previousCentered.code}`)
//       .selectAll(".cat")
//       .remove();
//   }

//   labelGrid = d3.selectAll(".label").each(d => {
//     var catOrdered = {};
//     var cats2 = [];

//     if (centered && d.code !== selected.code) {
//       d3.selectAll(`.label`)
//         .transition()
//         .duration(750)
//         .style("font-size", "20px")
//         .attr("y", d => d.y);

//       var subcells = d3.selectAll(`.state.${d.code} .subcell`);
//       subcells
//         .each(e => {
//           e.realx = e.x + d.x - cellSize / 2 + 1;
//           e.realy = d.y + e.y - (cellSize / 2 + 5) + 1;
//         })
//         .transition()
//         .duration(750)
//         .attr("width", subCellSize)
//         .attr("height", subCellSize)
//         .attr("x", e => e.realx)
//         .attr("y", e => e.realy);
//     } else if (d.code == selected.code) {
//       //  zoomed state
//       var ns = [0, 0, 0, 0, 0];
//       var subcells = d3.selectAll(`.state.${selected.code} .subcell`);
//       if (centered) {
//         const cats = [0, 0, 0, 0, 0];
//         subcells
//           .each(e => {
//             e.realx = d.x - cellSize / 2 + 1;
//             e.realx = e.realx;
//             e.realy = d.y - (cellSize / 2 + 5) + 1;
//             cats[e.index] = e.cat;

//             if (!catOrdered[e.cat]) {
//               catOrdered[e.cat] = [e];
//               cats2.push(e.cat);
//             } else {
//               catOrdered[e.cat].push(e);
//             }
//           })
//           .transition()
//           .duration(750)
//           .attr("width", subCellSize * shrickLevelWidth)
//           .attr("height", subCellSize * shrickLevelHeight)
//           .attr("x", e => {
//             ns[e.index]++;
//             if (e.index !== 4) {
//               return (
//                 e.realx + subCellSize * shrickLevelWidth * (ns[e.index] - 1)
//               );
//             } else {
//               var n = 0;
//               var stackedx = 0;
//               for (var catid = 0; catid < cats2.length; catid++) {
//                 var curcat = cats2[catid];
//                 if (
//                   curcat != catsPerState[selected.code][0].catName &&
//                   curcat != catsPerState[selected.code][1].catName &&
//                   curcat != catsPerState[selected.code][2].catName &&
//                   curcat != catsPerState[selected.code][3].catName
//                 ) {
//                   for (
//                     var scellid = 0;
//                     scellid < catOrdered[curcat].length;
//                     scellid++
//                   ) {
//                     if (catOrdered[curcat][scellid] === e) {
//                       stackedx = n;
//                       break;
//                     }
//                     n++;
//                   }
//                 }
//               }
//               return (
//                 e.realx +
//                 subCellSize * shrickLevelWidth * (stackedx)
//               );
//             }
//           })
//           .attr("y", e => {
//             return (
//               1 +
//               subCellSize * shrickLevelHeight +
//               e.realy +
//               e.index * 2 * subCellSize * shrickLevelHeight
//             );
//           });
//         let i = 1;

//         ns.forEach(pos => {
//           if (i < 5) {
//             d3.select(`.state.${selected.code}`)
//               .append("text")
//               .attr("class", "cat")
//               .style("font-size", "4px")
//               .style("stroke", "none")
//               .attr(
//                 "transform",
//                 `translate(${ x - (50 - pos) * (subCellSize * shrickLevelWidth) - 3},${y -
//                   (cellSize / 2 + (subCellSize * shrickLevelHeight) / 2 + 1) +
//                   i * 2 * subCellSize * shrickLevelHeight})`
//               )
//               .attr("fill", "#000")
//               .text(cats[i - 1]);
//           }

//           i++;
//         });
//         var x2 = d3
//           .scaleLinear()
//           .range([0, 100*(subCellSize * shrickLevelWidth)])
//           .domain([0, 100]);
//         var xAxis = d3
//           .axisBottom()
//           .scale(x2)
//           .ticks(5);
//         d3.select(`.state.${selected.code}`)
//           .append("g")
//           .attr("class", "y axis")
//           .call(xAxis)
//           .attr(
//             "transform",
//             `translate(${d.x - cellSize / 2 + 1},${y -
//               (cellSize / 2 + 5) +
//               2 +
//               5 * 2 * subCellSize * shrickLevelHeight})`
//           )
//           .select("path")
//           .attr("d", `M0.5.5H${100*(subCellSize * shrickLevelWidth)}`);
//         d3.select(`.state.${selected.code}`)
//           .selectAll(".tick line")
//           .style("stroke-width", 0.375)
//           .style("stroke", "black")
//           .attr("y2", 2);
//         d3.select(`.state.${selected.code}`)
//           .selectAll(".tick text")
//           .attr("y", 2)
//           .style("font-size", "4px")
//           .style("stroke", "none");
//       } else {
//         d3.selectAll(`.label`)
//           .style("font-size", "20px")
//           .attr("y", d => d.y);

//         // click on self to return to macro view
//         var subcells = d3.selectAll(`.state.${previousCentered.code} .subcell`);
//         subcells
//           .each(e => {
//             e.realx = e.x + d.x - cellSize / 2 + 1;
//             e.realy = d.y + e.y - (cellSize / 2 + 5) + 1;
//           })
//           .transition()
//           .duration(750)
//           .attr("width", subCellSize)
//           .attr("height", subCellSize)
//           .attr("x", e => e.realx)
//           .attr("y", e => e.realy);
//       }
//     }
//   });

//   eventGrid
//     .transition()
//     .duration(750)
//     .attr(
//       "transform",
//       "translate(" +
//         width / 2 +
//         "," +
//         height / 2 +
//         ")scale(" +
//         k +
//         ")translate(" +
//         -x +
//         "," +
//         -y +
//         ")"
//     )
//     .style("stroke-width", 1.5 / k + "px");

//   cellGrid
//     .transition()
//     .duration(750)
//     .attr(
//       "transform",
//       "translate(" +
//         width / 2 +
//         "," +
//         height / 2 +
//         ")scale(" +
//         k +
//         ")translate(" +
//         -x +
//         "," +
//         -y +
//         ")"
//     )
//     .style("stroke-width", 1.5 / k + "px");
//   // .style("opacity", () => centered? "0": "1");

//   labelGrid
//     .transition()
//     .duration(750)
//     .attr(
//       "transform",
//       "translate(" +
//         width / 2 +
//         "," +
//         height / 2 +
//         ")scale(" +
//         k +
//         ")translate(" +
//         -x +
//         "," +
//         -y +
//         ")"
//     )
//     .style("stroke-width", 1.5 / k + "px");
// }

// todo: barra acumulado se mete al lado
// hover
