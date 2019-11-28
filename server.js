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
let reservations = []; // reservations array with a limit of 5 elements

//array for the waiting list
let waitingList = [];

/********************************************************* */
// get homepage
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// get reserve
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// get tables
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// display reservations array
app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});

// display the waiting list array
app.get("/api/waitlist", function(req, res) {
  return res.json(waitingList);
});

//**************************************************************** */

app.post("/api/tables", function(req, res) {
  var newReservation = req.body;

  // We then add the json the user sent to the reservations array or to the waiting list
  if (reservations.length < 5) {
    reservations.push(newReservation);
    return res.json({ type: "reservation" });
  }

  waitingList.push(newReservation);
  return res.json({ type: "waiting list" });
});

// Listening the PORT
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
