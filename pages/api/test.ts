import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Mockgoose } from "mockgoose";
import User from "../../data/models";

type Data = {
  name: string;
};

const mockgoose: Mockgoose = new Mockgoose(mongoose);
const db = mongoose.connection;
mockgoose.prepareStorage().then(() => {
  mongoose.connect(`${process.env.DB_CONNECT_DB}`); // address of the DB
  mongoose.connection.on("connected", () => {
    console.log("Connected to DB here with mockgoose!");
  });
});
// const test = new User().getModelForClass(User);

// console.log(;

mongoose.connect(
  `${process.env.DB_CONNECT_DB}`,
  { useNewUrlParser: true },
  () => console.log("Connected to DB!"),
);

db.once("open", (_) => {
  console.log("Database connected: ", process.env.DB_CONNECT_DB);
});

db.on("error", (err) => {
  console.error("connection error: ", err);
});

export default (_: NextApiRequest, res: NextApiResponse<Data>): void => {
  res.statusCode = 200;
  res.json({ name: "Zeid Tisnes" });
};
