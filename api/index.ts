import mongoose from "mongoose";
import "dotenv/config";

const db = mongoose.connection;

// const MongoClient = require("mongodb").MongoClient;

// Connection to DB (add the env file in here for the user created locally)

// MongoClient.connect()

mongoose.connect(
  `${process.env.DB_CONNECT_DB}`,
  { useNewUrlParser: true },
  () => console.log("Connected to DB!"),
);

db.once("open", (_) => {
  console.log("Database connected: ", process.env.DB_URI);
});

db.on("error", (err) => {
  console.error("connection error: ", err);
});
