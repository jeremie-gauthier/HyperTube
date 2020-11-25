import { Document } from "mongoose";

export interface IUser extends Document {
  id: number;
  name: string;
  description: string;
  status: boolean;
}
