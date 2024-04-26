import { TRequestFunction } from '@knittotextile/knitto-http';
import configuration from '@root/libs/config';

const defaultController: TRequestFunction = async (req) => {
	const query = req.query;
	const result = {
		nama_aplikasi: configuration.APP_NAME,
		query
	};

	return { result };
};

export { defaultController };
