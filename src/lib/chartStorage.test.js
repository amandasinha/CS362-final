/**
 * @jest-environment jsdom
 */

//Initialize setups
require("@testing-library/jest-dom/extend-expect");
const { screen } = require("@testing-library/dom");
const userEvent = require("@testing-library/user-event").default;
const fs = require("fs");

// Update the function signature to include `saveChart`
function initDomFromFiles(htmlPath, jsPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  document.open();
  document.write(html);
  document.close();
  jest.isolateModules(function () {
    require(jsPath);
  });
}

/******************************** saveChart(chart, idx) *********************************/

// Import `saveChart` from the correct file
const saveChart = require("./chartStorage.js").saveChart;

test("Test saveChart function - no idx. ", function () {
  // Define the chart and index    
  const chart1 = { title: "Chart1", data: [1, 2, 3, 4, 5] };

  // Call the saveChart function
  saveChart(chart1);

  // Retrieve the saved charts from localStorage
  const savedChartsJSON = window.localStorage.getItem("savedCharts");
  const savedCharts = JSON.parse(savedChartsJSON);

  // Check if the chart was saved correctly
  expect(savedCharts).toBeDefined();        //Expect saved charts to be defined and have one saved chart
  expect(savedCharts.length).toEqual(1);
});

test("Test saveChart function - idx 1. ", function () {
  // Define the chart and index
  const chart2 = { title: "Chart2", data: [1, 2, 3, 4, 5] };

  // Call the saveChart function
  saveChart(chart2, 1);

  // Retrieve the saved charts from localStorage
  const savedChartsJSON = window.localStorage.getItem("savedCharts");
  const savedCharts = JSON.parse(savedChartsJSON);

  expect(savedCharts.length).toEqual(2);  //Expect saved charts to be defined and have two saved charts
});


/******************************** loadAllSavedCharts() *********************************/
const loadAllSavedCharts = require("./chartStorage.js").loadAllSavedCharts;

test("Test loadAllSavedCharts function - 2 charts saved. ", function () {
  
  // Declare to charts
  const chart1 = { title: "Chart1", data: [1, 2, 3, 4, 5] };
  const chart2 = { title: "Chart2", data: [6, 7, 8] };

  // Call the saveChart function and save both charts
  saveChart(chart1, 0); //Overwrite charts from previous tests saveChart function
  saveChart(chart2, 1);

  // Call the loadAllSavedCharts function
  const result = loadAllSavedCharts();

  // Check the result - should contain info on both charts
  expect(result).toEqual([{"data": [1, 2, 3, 4, 5], "title": "Chart1"}, {"data": [6, 7, 8], "title": "Chart2"}]);
});


/******************************** loadSavedChart(idx) *********************************/
const loadSavedChart = require("./chartStorage.js").loadSavedChart;

test("Test loadSavedCharts function - retrieve chart at index 1. ", function () {
  
  //Declare chart data and save
  const chart2 = { title: "Chart2", data: [6, 7, 8] };
  saveChart(chart2, 1);

  // Call the loadAllSavedCharts function with index 1
  const result = loadSavedChart(1);

  // Check the result - should contain info on the second chart only
  expect(result).toEqual(chart2);
});


/******************************** updateCurrentChartData() *********************************/
const updateCurrentChartData = require("./chartStorage.js").updateCurrentChartData;

test("Test updateCurrentChartData function. ", function () {
  
  // Define the chart data
  const currentChartData = { title: "Chart3", data: [ 0, 21, 37] };

  // Call the updateCurrentChartData function
  updateCurrentChartData(currentChartData);

  // Retrieve the stored chart data from localStorage
  const storedDataJSON = window.localStorage.getItem("currentChartData");
  const storedData = JSON.parse(storedDataJSON);

  // Check if the stored data matches the original chart data
  expect(storedData).toEqual(currentChartData);
});


/******************************** loadCurrentChartData() *********************************/
const loadCurrentChartData = require("./chartStorage.js").loadCurrentChartData;

test("Test loadCurrentChartData function. ", function () {
  // Define the chart data
  const currentChartData = { title: "Chart4", data: [23, 1, 45, 90] };

  // Store the chart data in localStorage
  updateCurrentChartData(currentChartData);

  // Call the loadCurrentChartData function
  const loadedData = loadCurrentChartData();

  // Check if the loaded data matches the original chart data
  expect(loadedData).toEqual(currentChartData);
});


