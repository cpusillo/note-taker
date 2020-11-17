// Import our dependencies
const express = require("express");
const fs = require("fs");

// Setup our express specific variables
const app = express()
const port = process.env.port || 3000;

// Allow us to access our public folder and work with our files.
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Express Routes - GET =================================================
// Set our "root" route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Set our "notes" route.
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Set our "/api/notes" route.
app.get("/api/notes/", function (req, res) {
  // Read the db file so we can put it on a page
  fs.readFile(__dirname + "/db/db.json", (err, data) => {
    // Parse our db.json data
    var json = JSON.parse(data);
    return res.json(json);
  })
});

// Set our "star" route as a catch-all, redirect to index.html
app.get("*", function(req, res) {
  res.sendFile((__dirname + "/public/index.html"));
});

// Express Routes - POST =================================================
app.post("/api/notes/", function (req, res) {
  newNote = req.body;

  // Get the JSON file from /db/ and parse it so we can add to it
  fs.readFile(__dirname + "/db/db.json", (err, data) => {
    var json = JSON.parse(data);
    // Push our new note in from our user's request.
    json.push(newNote);

    // Write the JSON file over with our new contents.
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(json));
  });
});

// Express Routes - DELETE =================================================
// Get our id to be deleted.
app.delete("/api/notes/:id", function (req, res) {
  // Get the id of the note to be deleted from our request parameter (:id)
  let response = req.params;
  let id = response.id;
  console.log(`Note id: ${id} marked for deletion`);

  // Read our JSON file, store it as a variable so we can manipulate the data.
  fs.readFile(__dirname + "/db/db.json", (err, data) => {
    // Parse our returned data and store as a variable.
    var json = JSON.parse(data);

    // Filter the data, making a new array of objects without the object containing the id.
    const filteredJson = json.filter((element) => element.id !== id);

    // Write our changes to the file, db.json.
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(filteredJson));

  });

});

// Express Server =================================================
// Start our server, listening on port 3001.
app.listen(process.env.PORT || 3000, () => {
  console.log(`Started server`)
}); 