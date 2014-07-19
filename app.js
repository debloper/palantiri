#!/usr/bin/env node

var express = require("express")
  , config  = require("./config")
  , jinja   = require("nunjucks")
  , body    = require("body-parser")
  , path    = require("path")
  , file    = require("fs")

var db  = require("monk")(config.DB_PATH)
var app = express()

// Configure Templating
jinja.configure('views', {
    autoescape: true,
    express: app
})

// Configure Application
app.use(body.json())
app.use(body.urlencoded({ extended: false }))
app.use("/", express.static(path.join(__dirname, 'static')))

// Setup Routes
// TODO: verbs used directly; replace/modularize them with `use`
app.get(["/", "/index", "/index.html"], function (req, res) {
  res.render("index.html")
})
app.get("/event/create", function (req, res) {
  res.render("create.html")
})
app.post("/event/create", function (req, res) {
  var events = db.get("events")
  events.insert(req.body, function (error) {
    if (error) {
        res.json(500, { message: error })
    } else {
        res.json(200, req.body)
    }
  })
})

// Start Server
var server = app.listen(config.APP_PORT, config.APP_IP, function () {
  console.log("Listening to port %d", server.address().port)
})
