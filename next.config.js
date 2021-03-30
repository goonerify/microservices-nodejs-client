module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300; // Activate file change detection every 300 ms
    return config;
  },
};
