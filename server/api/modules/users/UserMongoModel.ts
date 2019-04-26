import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from './UserInterface';

export interface IUSerModel extends IUser, Document { };

export let UserSchema: Schema = new Schema({
    createdAt: Date,
    name: String,
    role: String,
    email: String,
    password: String
});

export const UserModel: Model<IUSerModel> = model<IUSerModel>("User", UserSchema);
