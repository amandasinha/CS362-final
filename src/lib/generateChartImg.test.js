


//Setup Required vairbles and libraries
require("whatwg-fetch");
const rest = require("msw").rest
const setupServer = require("msw/node").setupServer
const path = require("path")
const generateChartImg = require("./generateChartImg.js");
const fs = require("node:fs")
const imagePath = path.join(__dirname, 'fakeImage.png');
const fakeImage = fs.readFileSync(imagePath);

//Setup fake response with fake image path
const server = setupServer(
  rest.post("https://quickchart.io/chart", function (req, res, ctx) {
    ctx.set("Content-Type", "image/png");
    return res(ctx.body(fakeImage));
  })
);

// Initialize files
function initDomFromFiles(jsPath) {
  jest.resetModules();
  jest.isolateModules(() => {
    require(jsPath);
  });
}

// Setup server run/close
beforeAll(function () {
  server.listen();
});
afterAll(function () {
  server.close();
});

/************************ generateChartImg ************************/
test("Correctly generate image from API.", async function () {
  initDomFromFiles("./generateChartImg.js");

  // Declare chart data
  const chartType = "Line";
  const chartData = [
    { x: 4, y: 2 },
    { x: 1, y: 3 },
    { x: 3, y: 1 },
  ];
  const x_axis = "x_axis";
  const y_axis = "y_axis";
  const chartTitle = "Chart1";
  const chartColor = "blue";

  // Call generateChartImg function with chart data
  const result = await generateChartImg(
    chartType,
    chartData,
    x_axis,
    y_axis,
    chartTitle,
    chartColor
  );

  // Make assertion
  expect(result).toBeTruthy(); //Check that result is a non-empty string
});
