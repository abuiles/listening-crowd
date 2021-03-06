/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['development', 'production'],
        config: {
          id: 'UA-84989389-1'
        }
      }
    ],
    modulePrefix: 'listening-crowd',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    APP: {
    }
  };

  if (environment === 'development') {
    ENV.pinnaHost = 'https://pinna.herokuapp.com';
    // ENV.pinnaHost = 'http://localhost:3000';
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.pinnaHost = 'https://pinna.herokuapp.com';
  }

  ENV['ember-simple-auth'] = {
    // authenticationRoute: 'login'
  };

  ENV['auth0-ember-simple-auth'] = {
    clientID: "C0w5wRMTjDHHrefy0ObWhYNzhU1f5CQz",
    domain: "llc-dev.auth0.com"
  };

  ENV.fastboot = {
    hostWhitelist: ['www.listeningcrowd.com', 'd6b13881.ngrok.io', /^localhost:\d+$/]
  };

  return ENV;
};
