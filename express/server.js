// Get dependencies
const express = require('express');                    //import express
const path = require('path');                          //import path
const http = require('http');                          //import http
const bodyParser = require('body-parser');             //body parser for get replys

// Get our API routes
const api = require('./routes/api');                  //require api.js

const app = express();                                //app variable intialized with express

// Parsers for POST data
app.use(bodyParser.json());                           //use the body parser for json from the responce
app.use(bodyParser.urlencoded({ extended: false }));  //use the body parser for the unicode responce

// Cross Origin middleware
app.use(function(req, res, next) {                    //set up mongoose middleware
  res.header("Access-Control-Allow-Origin", "*")      //allow new origin of header
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")                  //header feilds used
  next()
})

// Set our api routes
app.use('/', api);                                   //use routes from /routes/api.js


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';            //port to moniter
app.set('port', port);                              //set the server port to this port

/**
 * Create HTTP server.
 */
const server = http.createServer(app);              //create an http server using the mongoose middle and api routing from routes/api.js

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));           //listen on port and print to log portID