const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vjuc7k',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
