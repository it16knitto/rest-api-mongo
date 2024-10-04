import { Schema, model, Document } from 'mongoose';

interface IDynamic extends Document {
	[key: string]: any;
}

const dynamicSchema = new Schema<IDynamic>(
	{},
	{ strict: false, timestamps: true }
);

export const dynamicModel = model<IDynamic>('Dynamic', dynamicSchema);
