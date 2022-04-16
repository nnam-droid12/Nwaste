const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/api/*", { target: "https://nwaste-api.herokuapp.com/" }));
};