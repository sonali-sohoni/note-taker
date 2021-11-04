const express = require("express");

const PORT = process.env.PORT || 3003;
const path = require("path");
const notes = require("./db/db.json");
const app = express();
app.get("/api/notes", (req, res) => {
	console.log(notes);
	res.send(notes);
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
	console.log(`Server is now listening to the ${PORT}`);
});
