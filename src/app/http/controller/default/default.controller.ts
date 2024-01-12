import { ExpressType, TRequestFunction } from '@knittotextile/knitto-core-backend';
import configuration from '../../../../config';

const defaultController: TRequestFunction = async (req: ExpressType.Request) => {
	const query = req.query;
	const result = {
		nama_aplikasi: configuration.APP_NAME,
		query
	};

	return { result };
};

export { defaultController };
