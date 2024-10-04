import { InvalidParameterException } from '@knittotextile/knitto-core-backend/dist/CoreException';
import { TRequestFunction } from '@knittotextile/knitto-http';
import { mongoDB } from '@root/services/mongodb.service';
import { mapping } from '../dynamic/dynamic.controller';
import { TDynamicNativeData } from './dynamic-native.request';

export const getDynamicnativeData: TRequestFunction = async (req) => {
	const { search, page, perPage } = req.body as TDynamicNativeData;

	if (!search || !Array.isArray(search)) {
		throw new InvalidParameterException('Invalid search payload');
	}

	const subFilter = search.map(({ field, value, operator }) => {
		switch (operator.toLowerCase()) {
			case 'equal':
				return { [field]: value };
			case 'greater':
				return { [field]: { $gt: value } };
			case 'greater_or_equal':
				return { [field]: { $gte: value } };
			case 'less':
				return { [field]: { $lt: value } };
			case 'less_or_equal':
				return { [field]: { $lte: value } };
			case 'not_equal':
				return { [field]: { $ne: value } };
			case 'in':
				if (!Array.isArray(value)) {
					throw new InvalidParameterException('Invalid value type');
				}
				return { [field]: { $in: value } };
			case 'not_in':
				if (!Array.isArray(value)) {
					throw new InvalidParameterException('Invalid value type');
				}
				return { [field]: { $nin: value } };
			case 'regex':
				return { [field]: { $regex: value, $options: 'i' } };
			default:
				return {};
		}
	});

	const query = subFilter.length > 0 ? { $and: subFilter } : {};

	const data = await mongoDB
		.collection('dynamics')
		.find(query, { projection: { __v: 0 } })
		.skip((page - 1) * perPage)
		.limit(perPage)
		.toArray();

	const total = await mongoDB.collection('dynamics').countDocuments(query);
	const totalPages = Math.ceil(total / perPage);
	const meta = {
		total,
		totalPages,
		currentPage: page,
		perPage
	};

	return {
		result: { data: mapping(data), meta }
	};
};

export const getFieldNames: TRequestFunction = async () => {
	const fields = await mongoDB
		.collection('dynamics')
		.aggregate([
			{ $project: { fields: { $objectToArray: '$$ROOT' } } },
			{ $unwind: '$fields' },
			{ $group: { _id: null, allKeys: { $addToSet: '$fields.k' } } }
		])
		.toArray();
	return {
		result: { data: fields[0].allKeys }
	};
};

export const postDataDynamic: TRequestFunction = async (req) => {
	const body = req.body;
	type TransformedObject = {
		type: string;
		field: string;
	};

	const transformObject = (
		obj: any,
		parentKey = '',
		existingFields = new Set()
	): TransformedObject[] => {
		return Object.keys(obj).flatMap((key) => {
			const value = obj[key];
			const fullKey = parentKey ? `${parentKey}.${key}` : key;

			if (existingFields.has(fullKey)) {
				return [];
			}
			existingFields.add(fullKey);

			if (
				typeof value === 'object' &&
				value !== null &&
				!Array.isArray(value)
			) {
				return transformObject(value, fullKey, existingFields);
			}

			if (Array.isArray(value)) {
				const isArrayOfObjects = value.every(
					(item) => typeof item === 'object' && item !== null
				);
				if (isArrayOfObjects) {
					return value.flatMap((item) =>
						transformObject(item, fullKey, existingFields)
					);
				}
				return [{ type: 'array', field: fullKey }];
			}

			return [{ type: typeof value, field: fullKey }];
		});
	};

	const transformedBody = transformObject(body);
	const timestamp = new Date();
	body.created_at = timestamp;
	body.updated_at = timestamp;
	await mongoDB.collection('dynamics').insertOne(body);
	const bulkOps = transformedBody.map((field) => ({
		updateOne: {
			filter: { type: field.type, field: field.field },
			update: { $set: field },
			upsert: true
		}
	}));

	await mongoDB.collection('fields').bulkWrite(bulkOps);
	return {
		message: 'Success',
		result: null
	};
};

export const getAllField = async () => {
	const fields = await mongoDB.collection('fields').find({}).toArray();

	return {
		message: 'Success',
		result: fields
	};
};
