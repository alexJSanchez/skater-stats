const { MongoClient } = require("mongodb");

let dbConnection;
// mongodb+srv://<username>:<password>@cluster0.o5xrr4t.mongodb.net/?retryWrites=true&w=majority

module.exports = {
	connectToDb: (cb) => {
		MongoClient.connect(
			"mongodb+srv://samich:hello@cluster0.o5xrr4t.mongodb.net/?retryWrites=true&w=majority"
		)
			.then((client) => {
				dbConnection = client.db("stats");
				return cb();
			})
			.catch((err) => {
				console.log(err);
				return cb(err);
			});
	},
	getDb: () => dbConnection,
};
