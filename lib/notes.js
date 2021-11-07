const { fstat } = require("fs");
const notes = require("../db/db.json");
const fs = require("fs");
const path = require("path");
const filterByQuery = (query, notes) => {
	let filteredResults = notes;
	if (query.title) {
		console.log(query.title);
		filteredResults = filteredResults.filter((n) => n.title === query.title);
	}
	if (query.text) {
		filteredResults = filteredResults.filter((n) => n.text === query.text);
	}
	return filteredResults;
};

const filterById = (id, notes) => {
	const result = notes.filter((n) => n.id === id)[0];
	return result;
};

const getIndex = (id, notes) => {
	const index = notes.findIndex((n) => {
		console.log("comparing " + n.id + " with " + id);
		return n.id == id;
	});
	console.log("Index to be deleted " + index);
	return index;
};

const validateNote = (note) => {
	console.log(note, note.title, note.text, typeof note.title, typeof note.text);

	if (!note.title || !typeof note.title === "string") return false;
	if (!note.text || !typeof note.text === "string") return false;
	return true;
};

const createNewNote = (body, notes) => {
	const note = body;
	notes.push(note);
	fs.writeFileSync(
		path.join(__dirname, "../db/db.json"),
		JSON.stringify(notes)
	);
	return note;
};

const deleteNote = (id, notes) => {
	const index = getIndex(id, notes);
	if (index > -1) {
		let results = notes.splice(index, 1);
		console.log("Notes after deletion");
		console.log(notes);
		fs.writeFileSync(
			path.join(__dirname, "../db/db.json"),
			JSON.stringify(notes)
		);
		return true;
	} else {
		console.log("Selected note is not present ");
		return false;
	}
};

const generateNoteId = (notes) => {
	const id = Math.floor(Math.random() * 100);
	if (!filterById(id, notes)) {
		return id;
	}
};

module.exports = {
	createNewNote,
	validateNote,
	filterById,
	filterByQuery,
	deleteNote,
	generateNoteId,
};
