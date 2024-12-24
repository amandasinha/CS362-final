
//Setup test
const sortPoints = require('../sortPoints.js');

/*********************** TESTS ***********************/
test("Test case for array 3 points - positive.", function () {
    
    //Delcare both data sets
    const unsortedPoints = [
        { x: 4, y: 2 },
        { x: 1, y: 3 },
        { x: 3, y: 1 },
    ];
    const sortedPoints = [
        { x: 1, y: 3 },
        { x: 3, y: 1 },
        { x: 4, y: 2 },
    ];

    //Call sort points function and verify equlaity
  expect(sortPoints(unsortedPoints)).toEqual(sortedPoints);
});

test("Test case for array 4 points - negative.", function () {
    
    //Delcare both data sets
    const unsortedPoints = [
        { x: -4, y: -2 },
        { x: -1, y: -3 },
        { x: -3, y: -1 },
        { x: -9, y: -7 },
    ];
    const sortedPoints = [
        { x: -9, y: -7 },
        { x: -4, y: -2 },
        { x: -3, y: -1 },
        { x: -1, y: -3 },
    ];

    //Call sort points function and verify equlaity
    expect(sortPoints(unsortedPoints)).toEqual(sortedPoints);
  });

  test("Test case for array 5 points - positive + negative.", function () {
    
    //Delcare both data sets
    const unsortedPoints = [
        { x: 10, y: -17 },
        { x: 3, y: 3 },
        { x: -3, y: -1 },
        { x: -9, y: -7 },
        { x: -4, y: -11 },
    ];
    const sortedPoints = [
        { x: -9, y: -7 },
        { x: -4, y: -11 },
        { x: -3, y: -1 },
        { x: 3, y: 3 },
        { x: 10, y: -17 },        
    ];

    //Call sort points function and verify equlaity
    expect(sortPoints(unsortedPoints)).toEqual(sortedPoints);
  });