/**
 * @jest-environment jsdom
 */

//Hello
require("whatwg-fetch")
require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

const react = require('@testing-library/react');

const fs = require("fs");
function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
    })
}

const exp = require("constants")

beforeEach(function () {
    window.localStorage.clear()
})

test("Creates new pair of blank input fields for a new value.", async function () {
    initDomFromFiles(
        __dirname + "/../bar/bar.html",
        __dirname + "/../bar/bar.js"
    );

    const add_val_button = domTesting.getByText(document, "+");

    const user = userEvent.setup();
    await user.click(add_val_button);

    const x_val = domTesting.getAllByRole(document, "textbox", {name: "X"});
    const y_val = domTesting.getAllByRole(document, "spinbutton", {name: "Y"});

    expect(x_val).toHaveLength(2);
    expect(y_val).toHaveLength(2);

    expect(x_val[1]).not.toHaveValue();
    expect(y_val[1]).not.toHaveValue();
})

test("Creates new pair of inputs and does not change prior inputs.", async function () {
    initDomFromFiles(
        __dirname + "/../bar/bar.html",
        __dirname + "/../bar/bar.js"
    );

    const add_val_button = domTesting.getByText(document, "+");
    const x_init = domTesting.getByRole(document, "textbox", {name: "X"});
    const y_init = domTesting.getByRole(document, "spinbutton", {name: "Y"});

    const user = userEvent.setup();
    await user.click(add_val_button);
    await user.type(x_init, "1");
    await user.type(y_init, "2");

    var x_val = domTesting.getAllByRole(document, "textbox", {name: "X"});
    var y_val = domTesting.getAllByRole(document, "spinbutton", {name: "Y"});

    expect(x_val).toHaveLength(2);
    expect(y_val).toHaveLength(2);

    expect(x_val[0]).toHaveValue("1");
    expect(y_val[0]).toHaveValue(2);

    expect(x_val[1]).not.toHaveValue();
    expect(y_val[1]).not.toHaveValue();

    await user.type(x_val[1], "3");
    await user.type(y_val[1], "4");

    expect(x_val[1]).toHaveValue("3");
    expect(y_val[1]).toHaveValue(4);

    await user.click(add_val_button);

    x_val = domTesting.getAllByRole(document, "textbox", {name: "X"});
    y_val = domTesting.getAllByRole(document, "spinbutton", {name: "Y"});

    expect(x_val[2]).not.toHaveValue();
    expect(y_val[2]).not.toHaveValue();
    
})

test("Clears all values.", async function () {
    initDomFromFiles(
        __dirname + "/../bar/bar.html",
        __dirname + "/../bar/bar.js"
    );

    const add_val_button = domTesting.getByText(document, "+");
    const clear_val_button = domTesting.getByText(document, "Clear chart data");

    const chart_title = domTesting.getByLabelText(document, "Chart title");
    const x_label = domTesting.getByLabelText(document, "X label");
    const y_label = domTesting.getByLabelText(document, "Y label");
    const chart_color = domTesting.getByLabelText(document, "Chart color");

    const user = userEvent.setup();
    await user.click(add_val_button);
    await user.click(add_val_button);

    var x_val = domTesting.getAllByRole(document, "textbox", {name: "X"});
    var y_val = domTesting.getAllByRole(document, "spinbutton", {name: "Y"});

    await react.fireEvent.change(chart_color, {target: {value: "#000000"}})

    await user.type(chart_title, "The Best Line");
    await user.type(x_label, "The Middest X");
    await user.type(y_label, "The Worst Y");
    await user.click(chart_color);

    await user.type(x_val[0], "1");
    await user.type(x_val[1], "2");
    await user.type(x_val[2], "3");
    await user.type(y_val[0], "4");
    await user.type(y_val[1], "5");
    await user.type(y_val[2], "6");

    expect(chart_title).toHaveValue("The Best Line");
    expect(x_label).toHaveValue("The Middest X");
    expect(y_label).toHaveValue("The Worst Y");

    expect(x_val[0]).toHaveValue("1");
    expect(y_val[0]).toHaveValue(4);
    expect(x_val[1]).toHaveValue("2");
    expect(y_val[1]).toHaveValue(5);
    expect(x_val[2]).toHaveValue("3");
    expect(y_val[2]).toHaveValue(6);
    expect(chart_color).toHaveValue("#000000");

    await user.click(clear_val_button);

    x_val = domTesting.getAllByRole(document, "textbox", {name: "X"});
    y_val = domTesting.getAllByRole(document, "spinbutton", {name: "Y"});

    expect(chart_title).not.toHaveValue();
    expect(x_label).not.toHaveValue();
    expect(y_label).not.toHaveValue();

    expect(x_val).toHaveLength(1);
    expect(y_val).toHaveLength(1);
    
    expect(chart_color).toHaveValue("#ff4500");

})

test("There is an alert when user attempts to create a chart without values.", async function () {
    initDomFromFiles(
        __dirname + "/../bar/bar.html",
        __dirname + "/../bar/bar.js"
    );

    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const generate_button = domTesting.getByText(document, "Generate chart");

    var x_val = domTesting.getByRole(document, "textbox", {name: "X"});
    var y_val = domTesting.getByRole(document, "spinbutton", {name: "Y"});

    const chart_title = domTesting.getByText(document, "Chart title");
    const x_label = domTesting.getByText(document, "X label");
    const y_label = domTesting.getByText(document, "Y label");

    const user = userEvent.setup();

    await user.type(chart_title, "The Best Line");
    await user.type(x_label, "The Middest X");
    await user.type(y_label, "The Worst Y");
    
    expect(x_val).not.toHaveValue();
    expect(y_val).not.toHaveValue();

    await user.click(generate_button);

    expect(spy).toHaveBeenCalled();

})

test("There is an alert when user attempts to create a chart without axis labels.", async function () {
    initDomFromFiles(
        __dirname + "/../bar/bar.html",
        __dirname + "/../bar/bar.js"
    );

    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const generate_button = domTesting.getByText(document, "Generate chart");

    var x_val = domTesting.getByRole(document, "textbox", {name: "X"});
    var y_val = domTesting.getByRole(document, "spinbutton", {name: "Y"});

    const chart_title = domTesting.getByText(document, "Chart title");
    const x_label = domTesting.getByText(document, "X label");
    const y_label = domTesting.getByText(document, "Y label");

    const user = userEvent.setup();

    await user.type(chart_title, "The Best Line");
    await user.type(x_val, "1");
    await user.type(y_val, "2");
    
    expect(x_label).not.toHaveValue();
    expect(y_label).not.toHaveValue();

    await user.click(generate_button);

    expect(spy).toHaveBeenCalled();

})


jest.mock("../lib/generateChartImg", function (type, data, xLabel, yLabel, title, colo) {
    return jest.fn().mockResolvedValue("http://placekitten.com/480/480");
});

const generateChartImg = require("../lib/generateChartImg")

test("Correct data is sent from input to chart generation function.", async function () {
    initDomFromFiles(
        __dirname + "/../bar/bar.html",
        __dirname + "/../bar/bar.js"
    );

    //alert spy
    const alert_spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    //const generateChartImg = require("../lib/generateChartImg");

    //buttons
    const generate_button = domTesting.getByText(document, "Generate chart");
    const add_val_button = domTesting.getByText(document, "+");

    //labels
    const chart_title = domTesting.getByLabelText(document, "Chart title");
    const x_label = domTesting.getByLabelText(document, "X label");
    const y_label = domTesting.getByLabelText(document, "Y label");
    const chart_color = domTesting.getByLabelText(document, "Chart color");

    const user = userEvent.setup();

    //fill in label values
    await user.type(chart_title, "The Best Line");
    await user.type(x_label, "The Middest X");
    await user.type(y_label, "The Worst Y");
    await react.fireEvent.change(chart_color, {target: {value: "#000000"}})

    await user.click(add_val_button);

    //get x,y vals
    var x_val = domTesting.getAllByRole(document, "textbox", {name: "X"});
    var y_val = domTesting.getAllByRole(document, "spinbutton", {name: "Y"});

    //fill in x,y values
    await user.type(x_val[0], "1");
    await user.type(y_val[0], "2");
    await user.type(x_val[1], "3");
    await user.type(y_val[1], "4");

    //Necessary values exist
    expect(chart_title).toHaveValue("The Best Line");
    expect(y_label).toHaveValue("The Worst Y");
    expect(x_label).toHaveValue("The Middest X");
    expect(chart_color).toHaveValue("#000000");
    expect(x_val[0]).toHaveValue("1");
    expect(y_val[0]).toHaveValue(2);
    expect(x_val[1]).toHaveValue("3");
    expect(y_val[1]).toHaveValue(4);
    expect(chart_color).toHaveValue("#000000");

    await user.click(generate_button);

    expect(generateChartImg).toHaveBeenCalledWith("bar", [{x:"1", y:"2"}, {x:"3", y:"4"}], "The Middest X", "The Worst Y", "The Best Line", "#000000");
    expect(generateChartImg).toReturn();
})