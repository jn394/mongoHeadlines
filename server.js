var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoscraper14";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine('hbs', exphbs({ defaultLayout: "main", extname: '.hbs' }));
app.set('view engine', '.hbs');

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
