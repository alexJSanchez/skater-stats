// import express
const express = require("express");
const cors = require("cors");
//instances of express app
const server = express();
//glabal middleware
server.use(express.json());
server.use(cors());
// routes
server.get("/books", (req, res) => {
	res.json({ users: ["userone", "usertwo", "userthree"] });
});
// port 5000 turned on
server.listen(5000, () => {
	console.log("server is running");
});
