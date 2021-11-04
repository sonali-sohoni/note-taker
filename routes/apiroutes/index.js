const path = require("path");
const router = require("express").Router();
const notes = require("../../db/db.json");
const {
	filterById,
	filterByQuery,
	validateNote,
	createNewNote,
} = require("../../lib/notes");
router.get("/notes", (req, res) => {
	//	console.log(notes);

	//	const n = { title: "HHPP", text: "Fictional" };
	//	notes.push(n);
	let results = notes;
	if (req.query) {
		//	console.log(req.query);
		results = filterByQuery(req.query, notes);
	}
	console.log(results);
	res.json(results);
});

router.get("/notes:id", (req, res) => {
	const result = filterById(req.params.id, notes);
	if (result) {
		res.json(result);
	} else {
		res.status(404).send("Requested record was not found.");
	}
});

router.post("/notes", (req, res) => {
	const note = req.body;
	note.id = notes.length;
	if (validateNote(note)) {
		const result = createNewNote(note, notes);
		res.json(result);
	} else {
		res.status(400).send("Note object validation failed.");
	}
});

module.exports = router;
