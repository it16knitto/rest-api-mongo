import { TRequestFunction } from '@knittotextile/knitto-http';
import { dynamicModel } from '@root/models/dynamic.model';
import {
	InvalidParameterException,
	NotFoundException
} from '@knittotextile/knitto-core-backend/dist/CoreException';
import {
	TGetDynamicDataValidation,
	TGetDynamicSearchValidation
} from './dynamic.request';

export const dynamicCreate: TRequestFunction = async (req) => {
	const result = await dynamicModel.create(req.body);
	return {
		result
	};
};

export const dynamicFindAll: TRequestFunction = async (req) => {
	const { page = 1, perPage = 10, search = '' } = req.query;
	const query = search ? { $text: { $search: String(search) } } : {};
	// Ensure text index is created for $text query
	await dynamicModel.collection.createIndex({ '$**': 'text' });

	const totalItems = await dynamicModel.countDocuments(query);
	const result = await dynamicModel
		.find(query, { createdAt: false })
		.skip((Number(page) - 1) * Number(perPage))
		.limit(Number(perPage));
	const totalPages = Math.ceil(totalItems / Number(perPage));
	return {
		result: {
			data: result,
			meta: {
				totalItems,
				totalPages,
				currentPage: Number(page),
				pageSize: Number(perPage)
			}
		}
	};
};

export const dynamicFindById: TRequestFunction = async (req) => {
	const { id } = req.params;
	const result = await dynamicModel.findById(id);
	if (!result) {
		throw new NotFoundException();
	}
	return {
		result
	};
};

export const dynamicUpdate: TRequestFunction = async (req) => {
	const { id } = req.params;
	const result = await dynamicModel.findByIdAndUpdate(id, req.body, {
		new: true
	});
	return {
		result
	};
};

export const dynamicDelete: TRequestFunction = async (req) => {
	const { id } = req.params;
	const result = await dynamicModel.findByIdAndDelete(id);
	return {
		result
	};
};

export const findFieldUnique: TRequestFunction = async () => {
	const result = await dynamicModel.aggregate([
		{
			$project: {
				fields: {
					$objectToArray: '$$ROOT'
				}
			}
		},
		{
			$unwind: '$fields'
		},
		{
			$group: {
				_id: null,
				allKeys: {
					$addToSet: {
						field: '$fields.k',
						type: { $type: '$fields.v' }
					}
				}
			}
		}
	]);
	return {
		result: result[0].allKeys
	};
};

export const findDynamicField: TRequestFunction = async (req) => {
	const { search, page, perPage } = req.body as TGetDynamicSearchValidation;
	if (!search || !Array.isArray(search)) {
		throw new InvalidParameterException('Invalid search payload');
	}
	let filter = search.length > 0 ? { $and: [] } : {};

	search.forEach((group) => {
		const { operation, conditions } = group;

		if (!conditions || !Array.isArray(conditions) || !operation) {
			throw new InvalidParameterException('Invalid search conditions');
		}

		const subFilter = conditions.map(({ field, value, operator }) => {
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

		if (operation.toLowerCase() === 'and') {
			filter.$and.push({ $and: subFilter });
		} else if (operation.toLowerCase() === 'or') {
			filter.$and.push({ $or: subFilter });
		} else {
			throw new InvalidParameterException(
				'Invalid operation type. Use "and" or "or".'
			);
		}
	});

	const options = {
		skip: (page - 1) * perPage,
		limit: perPage
	};

	const data = await dynamicModel.find(filter, null, options);
	const total = await dynamicModel.countDocuments(filter);
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

const mapping = (result: any[]) => {
	const arrResult = [];
	for (const item of result) {
		const id = item._id;
		const createdAt = item.createdAt;
		const updatedAt = item.updatedAt;
		const field_name = Object.keys(item).filter(
			(key) =>
				key !== '_id' &&
				key !== '$__v' &&
				key !== '$isNew' &&
				key !== '_doc' &&
				key !== '$__'
		);
		const data = field_name.map((key) => {
			const value = item[key];
			const type = typeMapping(value);
			if (type === 'array of object' && value !== null) {
				return {
					name_field: key,
					caption: convertToNormal(key),
					type,
					is_recursive: true,
					data: value.map((subItem: any) => mapping([subItem])[0])
				};
			}
			if (type === 'object' && value !== null) {
				return {
					name_field: key,
					type,
					is_recursive: true,
					caption: convertToNormal(key),
					...mapping([value])[0]
				};
			}
			return {
				name_field: key,
				type,
				is_recursive: false,
				caption: convertToNormal(key),
				value
			};
		});

		arrResult.push({ id, createdAt, updatedAt, data });
	}

	return arrResult;
};
const typeMapping = (variable: any) => {
	const type = typeof variable;
	if (type === 'object' && variable !== null) {
		if (Array.isArray(variable)) {
			if (variable.some((item) => typeof item === 'object' && item !== null)) {
				return 'array of object';
			}
			return 'array';
		}
		return 'object';
	}
	return type;
};

const convertToNormal = (varibale: string) => {
	const isCamelCase = /^[a-z][a-zA-Z0-9]*$/.test(varibale);
	const isSnakeCase = /^[a-z][a-z0-9]*(_[a-z0-9]+)*$/.test(varibale);

	if (isCamelCase) {
		return varibale
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.replace(/^./, (str) => str.toUpperCase());
	} else if (isSnakeCase) {
		return varibale
			.replace(/_([a-z])/g, (_, char) => ' ' + char.toUpperCase())
			.replace(/^./, (str) => str.toUpperCase());
	}
	return varibale;
};

export const getDynamicData: TRequestFunction = async (req) => {
	const { search, page, perPage } = req.body as TGetDynamicDataValidation;
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
	const data = await dynamicModel.find(query, null, {
		skip: (page - 1) * perPage,
		limit: perPage
	});

	const total = await dynamicModel.countDocuments(query);
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
