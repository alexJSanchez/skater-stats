// import express
const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
// connect to data base
const { connectToDb, getDb } = require("./src/db");
//instances of express app
const server = express();
//glabal middleware
server.use(express.json());
server.use(cors());
// server.use(cors());
// // routes
// server.get("/books", (req, res) => {
// 	res.json({ users: ["userone", "usertwo", "userthree"] });
// });
// // port 5000 turned on
// server.listen(5000, () => {
// 	console.log("server is running");
// });
let db;

connectToDb((err) => {
	if (!err) {
		server.listen(5000, () => {
			console.log("port is listening on 5000");
		});
		db = getDb();
	}
});
// get all riders
server.get("/riders", (req, res) => {
	let riders = [];

	db.collection("riders") // Remove ".stats" from the collection name
		.find()
		.sort({ tracks: 1 })
		.toArray()
		.then((riders) => {
			res.status(200).json(riders);
		})
		.catch((err) => {
			res.status(500).json({ error: "could not fetch the documents" });
		});
});
// return one rider
server.get("/riders/:id", (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		db.collection("riders")
			.findOne({ _id: new ObjectId(req.params.id) })
			.then((doc) => {
				res.status(200).json(doc);
			})
			.catch((err) => {
				res.status(500).json({ error: "cant fetch" });
			});
	} else {
		res.status(400).json({ error: "not a valid id" });
	}
});
// post a new rider
server.post("/riders", (req, res) => {
	const rider = req.body;
	const { name, city, state, stance } = rider;
	if (!name || !city || !state || !stance) {
		res
			.status(400)
			.json({ message: "Make sure payload has name/city/state/stance" });
	} else {
		db.collection("riders")
			.insertOne(rider)
			.then((result) => {
				res.status(201).json(result); // Return the inserted document
			})
			.catch((err) => {
				res.status(500).json({ error: err.message });
			});
	}
});
// update a rider
server.patch("/riders/:id", (req, res) => {
	const updates = req.body;
	if (ObjectId.isValid(req.params.id)) {
		db.collection("riders")
			.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
			.then((doc) => {
				res.status(200).json(doc);
			})
			.catch((err) => {
				res.status(500).json({ error: "cant fetch" });
			});
	} else {
		res.status(400).json({ error: "not a valid id" });
	}
});
// delete a rider
server.delete("/riders/:id", (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		db.collection("riders")
			.deleteOne({ _id: new ObjectId(req.params.id) })
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
				res.status(500).json({ error: "cant delete" });
			});
	} else {
		res.status(400).json({ error: "not a valid id" });
	}
});
