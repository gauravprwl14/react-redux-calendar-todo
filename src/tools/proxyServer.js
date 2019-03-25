const express = require("express");
const proxy = require("http-proxy-middleware");
const cors = require("cors");

/**
 * Configure proxy middleware
 */

// const mandrakeProxy = proxy({
//   target: "http://10.0.206.41:50000/",
//   changeOrigin: true,
//   logLevel: "debug"
// });

// const observerStagingProxy = proxy({
//   // target: "https://pro-api-qa.sortly.co",
//   target: "http://www.randomtext.me",
//   changeOrigin: true,
//   logLevel: "debug"
// });
const observerStagingProxy = proxy({
  // target: "https://pro-api-qa.sortly.co",
  target: "http://www.randomtext.me",
  changeOrigin: true,
  logLevel: "debug"
});
// const observerStagingProxy = proxy({
//   target: "http://testglaceserver.herokuapp.com/",
//   changeOrigin: true,
//   logLevel: "debug"
// });

// '10.201.19.95',
// 10.201.19.95

const app = express();

app.use(cors({ exposedHeaders: ["nextphoenixauthorization"] }));

/**
 * Add the proxy to express
 */
app.use("/", observerStagingProxy);

app.listen(3050);

console.info("[DEMO] Server: listening on port 3050");
