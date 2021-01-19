import { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  name: string;
  description: string;
  status: boolean;
  email: string;
}
