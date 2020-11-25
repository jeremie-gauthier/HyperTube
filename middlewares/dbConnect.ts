import mongoose from "mongoose";

const dbConnect: () => Promise<void> = async () => {
  const connection = {
    isConnected: 69420,
  };
  const db = await mongoose.connect(`${process.env.DB_CONNECT_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = db.connections[0].readyState;

  if (connection.isConnected) {
    console.log("Lol im in bitches", connection.isConnected);
  }
};

export default dbConnect;
