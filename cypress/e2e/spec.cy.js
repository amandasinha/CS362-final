/**
 * @jest-environment jsdom
 */

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/')
  })
})

it("Chart is correctly generated", function() {
  cy.visit("http://localhost:8080/line.html")

  cy.basic()

  cy.get('#generate-chart-btn').click()


  cy.get("#chart-img").should("exist")
})

it("Chart data is maintained across pages", function() {
  cy.visit("http://localhost:8080/line.html")
  cy.basic()

  cy.findByRole("link", {name: "Scatter"})

  cy.get('label.chart-title input').should("have.value", "Cats vs Dogs")

  cy.findByRole("link", {name: "Bar"})

})

it("Saving a chart to the gallery", function() {
  cy.visit("http://localhost:8080/line.html")
  cy.basic()
  cy.get("#generate-chart-btn").click()

  cy.get("#chart-img").should("exist")

  cy.get("#save-chart-btn").click({force: true})

  cy.get("li.right a").click()

  cy.findByText("Cats vs Dogs").should("exist")
})

it("Re-opening a saved chart", function() {
  cy.visit("http://localhost:8080/line.html")
  cy.basic()
  cy.get("#generate-chart-btn").click()
  cy.get("#chart-img").should("exist")
  cy.get("#save-chart-btn").click({force: true})
  cy.get("li.right a").click()

  //click on the saved image

  cy.findByText("Cats vs Dogs").should("exist")
  cy.get(".chart-img").click()
})

