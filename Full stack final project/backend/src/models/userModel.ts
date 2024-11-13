import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
   name: string;
   password: string;
   organization:  string;
   area: string;
   budget: number
}

export interface IUserModel extends mongoose.Model<IUser> {}

const userSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   organization: { type: String, required: true },
   area: { type: String },
   budget: { type: Number },
});

export default mongoose.model<  IUser, IUserModel>("User", userSchema);