import {format} from "date-fns"

describe('Month spec', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })

  it('get the right month', () => {
    cy.getByData("month-selected").contains(format(new Date(), 'MMMM yyyy'))
  })
})
