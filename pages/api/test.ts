import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import User from "../../data/models/User";
import db from "../../middlewares/dbConnect";

type Data = {
  name: string;
};

db.once("open", (_) => {
  console.log(
    "Database connected with db.once(open): ",
    "mongodb+srv://test:test@cluster0.8nlmr.mongodb.net/test",
  );
});

db.on("error", (err) => {
  console.error("connection error: ", err);
});

export default (_: NextApiRequest, res: NextApiResponse<Data>): void => {
  res.statusCode = 200;
  res.json({ name: "Zeid Tisnes" });
};
