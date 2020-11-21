// A document object stored for MongoDB
import mongoose from "mongoose";

// const PostSchema = mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     date:{
//         type: Date,
//         default: Date.now
//     }
// });

interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true},
  firstName: { type: String, required: true},
  lastName: { type: String, required: true}
});
const User = mongoose.model("User", UserSchema);

new User({
    email: "ztisnes@student.42.org.fr",
    firstName: "Zeid",
    lastName: "Tisnes"
})

export { User };
// const User: Model<IUser> = model("User", UserSchema);