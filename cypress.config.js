const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.globant.com',
    watchForFileChanges: false,
    blockHosts: ['*.google-analytics.com', '*.clarity.ms', '*.g.doubleclick.net', '*.usercentrics.eu', '*.google.com/recaptcha'],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
