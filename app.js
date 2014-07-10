#!/usr/bin/env node

var express = require("express")
  , config  = require("./config")
  , path    = require("path")
  , file    = require("fs")

var app = express()

// Configure Application
app.use("/", express.static(path.join(__dirname, 'static')))

// Setup Routes
app.get(["/", "/index", "/index.html"], function (req, res) {
  res.writeHead(200, {"Content-Type": "text/html"})
  res.end(file.readFileSync("index.html", "utf-8"))
})

// Start the server
var server = app.listen(config.APP_PORT, config.APP_IP, function () {
  console.log("Listening to port %d", server.address().port)
})
