import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

type Data = {
  name: string;
};

const db = mongoose.connection;

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
