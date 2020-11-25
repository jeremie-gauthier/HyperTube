import mongoose from "mongoose";
import express from "express";
import "dotenv/config";

const app = express();
const db = mongoose.connection;

// const MongoClient = require("mongodb").MongoClient;

// app.get("/posts", (req, res) => res.send("Get kekd"));
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

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
