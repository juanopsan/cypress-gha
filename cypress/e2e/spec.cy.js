/// <reference types="cypress"/>

describe('Globant Demo', () => {

  beforeEach(() => {
    
    cy
      .intercept({
        method: 'GET',
        url: 'https://www.google.com/recaptcha/api.js?hl='
      },
      {
        statusCode: 200
      })
      .as('recaptcha')

    cy
      .intercept({
        method: 'POST',
        url: '/front?ajax_form=1&_wrapper_format=drupal_ajax'
      },
      {
        forceNetworkError: true
      })
      .as('submitForm')

    cy
      .visit('/')

  })

  it('Chaining Commands', () => {

    //retry
    //parent, child and dual commands

    cy
      .contains('Meet an Expert')
      .should('be.visible')
      .click()
      .location('pathname')
      .should('eq', '/contact')
      
  })

  it('Multiple assertions', () => {

    //retry
    //custom logic

    cy
      .get('#highlights .row')
      .find('.entityTitle')
      .then((news) => {
        if (news.length !== 4) {
          throw new Error('Not enough news!')
        }
        expect(news[0].outerHTML).to.contains('Cutting-Edge AI Assistant')
        expect(news[1].outerHTML).to.contains('Get valuable insights')
      })

  })

  it('Changing the DOM', () => {

    cy
      .contains('We deliver the best')
      .should('be.visible')
      .invoke('hide')
      .should('not.be.visible')

    cy
      .get('a[href="/stay-relevant"]').as('stay-relevant')
      .should('not.be.visible')
      .get('button.button--ultimenu')
      .trigger('click')
      .get('@stay-relevant')
      .should('be.visible')

  })

  it('Cookies', () => {

    //cookies management

    cy
      .getCookie('MR')
      .should('be.null')

  })

  it('Sending requests', () => {

    cy
      .request({
        method: 'POST',
        url: '/front?ajax_form=1&_wrapper_format=drupal_ajax'
      })
      .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(2)
      })

  })

  it('Intercept request', () => {

    //wait

    cy
      .wait('@recaptcha')
      .then((object) => {
        expect(object.response).to.have.property('statusCode', 200)
        expect(object.request.headers).to.have.property('host', 'www.google.com')
      })

  })

  it('Stubbing responses', () => {
    
    cy
      .get('input[data-webform-required-error^="Your"]')
      .type('Challenge')

    cy
      .get('input[data-webform-required-error^="First"]')
      .type('First')

    cy
      .get('input[data-webform-required-error^="Last"]')
      .type('Last')

    cy
      .get('input[data-webform-required-error^="E-mail"]')
      .type('email@email.com')

    cy
      .get('div.choices__list--dropdown')
      .invoke('addClass', 'is-active')
      .find('input')
      .type('Argentina{enter}')

    cy
      .get('#edit-actions-submit')
      .click()
    
    cy
      .wait('@submitForm')

  })

  it('Custom commands', () => {

    cy
      .getElementByRequiredError('First')
      .should('be.visible')

  })
})