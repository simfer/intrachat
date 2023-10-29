const path = require("path");
const express = require("express");
const app = express(); // create express app
const chromium = require('chromium');
const { execFile } = require('child_process');
const APPLICATION_PORT = 4792; //porta da cambiare per l'applicazione

execFile(chromium.path, [`http://localhost:${APPLICATION_PORT}`], err => {
  console.log('Application started!');
});

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

// start express server on port APPLICATION_PORT
app.listen(APPLICATION_PORT, () => {
  console.log(`Application started on port ${APPLICATION_PORT}`);
});