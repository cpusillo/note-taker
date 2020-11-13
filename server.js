// Import our dependencies
const express = require("express");
const fs = require("fs");

// Setup our express specific variables
const app = express()
const port = process.env.port || 3001;

// Allow us to access our public folder.
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set our "root" route
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

// Start our server, listening on port 3000.
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })