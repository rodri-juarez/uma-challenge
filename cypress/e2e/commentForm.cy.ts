
describe("Comment form spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it("allows users to add new comments", () => {
    cy.getByData("calendar-day").eq(0).within(() => {
      cy.getByData("open-day-button").click()
    })
    cy.getByData("comment-input").type("This is a great photo")
    cy.getByData("submit-button").click({force: true})
    cy.getByData("success-message").should("exist").contains("The comment was successfully added.")
  })
})
