// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// array for reservation

let reservations = []; /// new Array(5); array with a limit of 5 elements

//array for waiting list

let waitingList = [];

/********************************************************* */
// get homepage
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// get reserve
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// get tables
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

//display tables

app.get("/api/tables", function (req, res) {
  return res.json(reservations);
});

//**************************************************************** */

app.post("/api/tables", function (req, res) {
  var newReservation = req.body;

  // We then add the json the user sent to the character array
  reservations.push(newReservation);

  console.log(reservations);
  // We then display the JSON to the users
  res.json(newReservation);
});

// Listening the PORT
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
