/// <reference types="cypress"/>

declare namespace Cypress {

    interface Chainable {

        /**
         * Gets an element using the data-webform-required-error attribute
         * 
         * @example
         * cy
         *  .getElementByRequiredError('error name')
         */

        getElementByRequiredError()

    }

}