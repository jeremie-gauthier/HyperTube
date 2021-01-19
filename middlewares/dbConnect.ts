import mongoose from "mongoose";

mongoose.connect("mongodb+srv://test:test@cluster0.8nlmr.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
export default db;
