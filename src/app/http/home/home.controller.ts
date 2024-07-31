import { TRequestFunction } from '@knittotextile/knitto-http';
import { APP_NAME, APP_VERSION } from '@root/libs/config';

export const home: TRequestFunction = async () => {
	return {
		result: { APP_NAME, APP_VERSION }
	};
};
