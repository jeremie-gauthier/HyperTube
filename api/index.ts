import express from "express";
import mongoose from "mongoose";
import postsRoutes from "./routes/posts";

const app = express();
const PORT = 8888;
const uri = "mongodb://localhost:27017/users";
const db = mongoose.connection;

// const MongoClient = require("mongodb").MongoClient;

//Posts routes
app.use("/posts", postsRoutes);

// app.get("/posts", (req, res) => res.send("Get kekd"));
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

// Connection to DB (add the env file in here for the user created locally)
// const dbName = 'users';
// let db

// MongoClient.connect()

mongoose.connect(
  uri,
  { useNewUrlParser: true },
  () => console.log("Connected to DB!")
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
db.once("open", _ => {
  console.log("Database connected: ", uri);
});

db.on("error", err => {
  console.error("connection error: ", err);
});