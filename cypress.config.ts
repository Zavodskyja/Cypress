require('dotenv').config();
import cypress, { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";


export default defineConfig({
  e2e: {
    baseUrl: process.env.API,
    viewportWidth : 1920,
    viewportHeight: 1080,
    env: {
      login: process.env.LOGIN,
      loginPassword: process.env.LOGIN_PASSWORD,
      productUrl: process.env.STAGING,
      stagingLogin: process.env.STAGING_LOGIN,
      stagingPassword: process.env.STAGING_PASSWORD,
    },
    specPattern: "**/*.feature",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});