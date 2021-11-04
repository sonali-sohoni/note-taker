const express = require("express");

const PORT = process.env.PORT || 3003;
const path = require("path");
const notes = require("./db/db.json");
const htmlroutes = require("./routes/htmlroutes");
const apiroutes = require("./routes/apiroutes");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api",apiroutes)
app.use("/", htmlroutes);

// app.get("/api/notes", (req, res) => {
// 	console.log(notes);
// 	res.send(notes);
// });

app.listen(PORT, () => {
	console.log(`Server is now listening to the ${PORT}`);
});
