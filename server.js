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
    server.listen(3000, () => {
      console.log("port is listening on 3000");
    });
    db = getDb();
  }
});

server.get("/books", (req, res) => {
  let books = [];
  db.collection("books")
    .find()
    .sort({ tracks: 1 })
    .forEach((book) => {
      books.push(book);
    })
    .then(() => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({ error: "could not detch the documents" });
    });
});

server.get("/books", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collections("books")
      .findOne({ _id: req.params.id })
      .then((doc) => {
        res.status(200).json(res);
      })
      .catch((err) => {
        res.status(500).json({ error: "cant fetch" });
      });
  } else {
    res.status(400).json({ error: "not a valid id" });
  }
});

server.post("/books", (req, res) => {
  const books = req.body;
  db.collection("books")
    .insertOne(books)
    .then((res) => {
      res.status(201).json({ message: "successful insert" });
    })
    .catch((err) => {
      res.status(500).json({ message: "could not create a new document" });
    });
});
