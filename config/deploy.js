/* jshint node: true */
require('dotenv').config({ silent: true });

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
  };

  // ENV.rollbar = {
  //   accessToken: process.env.ROLLBAR_TOKEN,
  //   accessServerToken: process.env.ROLLBAR_SERVER_TOKEN,
  //   minifiedPrependUrl: process.env.S3_BUCKET,
  //   didDeploy: function() {
  //     // We don't want the default behavior from ember-cli-rollbar.
  //     return function() {
  //       return true;
  //     };
  //   }
  // };

  /*
   This tells ember-cli-deploy-s3-index how to name the index file.
   We end with files like: index.html:short-sha
   */
  ENV['revision-data'] = {
    type: 'git-commit'
  };

  ENV.build.environment = deployTarget;

  /*
   This is used by ember-cli-deploy-s3 to upload all the assets.
   */
  ENV.s3 = {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY,
    exclude: ['.DS_Store', '*-test.js', 'index.html', '*.map', '.gitkeep'],
    region: 'us-east-1',
    bucket: process.env.S3_BUCKET
  };

  /*
   This tells ember-cli-deploy-s3-index where to upload the index.
   */
  ENV['s3-index'] = {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY,
    acl: 'public-read',
    region: 'us-east-1',
    bucket: process.env.S3_BUCKET,
    hostName: process.env.S3_BUCKET
  };

  return ENV;
};
