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

server.get("/riders/:id", (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		db.collection("riders")
			.findOne({ customer_id: 2 })
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

server.post("/riders", (req, res) => {
	const rider = req.body;
	db.collection("riders")
		.insertOne(rider)
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});
