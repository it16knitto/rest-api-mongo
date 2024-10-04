import { TRequestFunction } from '@knittotextile/knitto-http';
import { userModel } from '@root/models/user.model';

export const userFindAll: TRequestFunction = async () => {
	const result = await userModel.aggregate([
		{ $match: { uuid: { $ne: null } } }
	]);

	return {
		result
	};
};

export const userCreate: TRequestFunction = async (req) => {
	const result = await userModel.create(req.body);
	return {
		result
	};
};

export const userFindOne: TRequestFunction = async (req) => {
	const { uuid } = req.params;
	const result = await userModel.findOne({ uuid });
	return {
		result
	};
};

export const userUpdate: TRequestFunction = async (req) => {
	const { uuid } = req.params;
	const result = await userModel.findOneAndUpdate({ uuid }, req.body, {
		new: true
	});
	return {
		result
	};
};

export const userDelete: TRequestFunction = async (req) => {
	const { uuid } = req.params;
	const result = await userModel.findOneAndDelete({ uuid });
	return {
		result
	};
};
