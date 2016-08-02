module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'the-listening-crowd',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
