import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IUser {
	name: string;
	email: string;
	password?: string;
	uuid?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
	{
		uuid: { type: String, required: true, unique: true, default: uuidv4 },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now }
	},
	{ timestamps: true }
);

export const userModel = model<IUser>('User', userSchema);
