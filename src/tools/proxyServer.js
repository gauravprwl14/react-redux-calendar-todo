const express = require("express");
const proxy = require("http-proxy-middleware");
const cors = require("cors");

/**
 * Configure proxy middleware
 */


const observerStagingProxy = proxy({
  target: "http://www.randomtext.me",
  changeOrigin: true,
  logLevel: "debug"
});

const app = express();


/**
 * Add the proxy to express
 */
app.use("/", observerStagingProxy);

app.listen(3050);

console.info("[DEMO] Server: listening on port 3050");
