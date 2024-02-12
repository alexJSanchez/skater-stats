// import express
const express = require("express");
const cors = require("cors");
// connect to data base
const { connectToDb, getDb } = require("./src/db");
//instances of express app
const server = express();
//glabal middleware
server.use(express.json());
server.use(cors());
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
		server.listen(3000, () => {
			console.log("port is listening on 3000");
		});
		db = getDb();
	}
});

server.get("./books", (req, res) => {
	res.json({ msg: "welcome to the api" });
});
