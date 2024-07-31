import { logger } from '@knittotextile/knitto-core-backend';
import { ExpressServer } from '@knittotextile/knitto-http';
import { APP_PORT_HTTP } from '@root/libs/config';
import path from 'path';

async function httpServer() {
	try {
		const server = new ExpressServer({
			routerPath: {
				basePath: __dirname,
				exceptDir: [
					path.join(__dirname, 'middlewares'),
				]
			},
			port: APP_PORT_HTTP
		});

		await server.start();
	} catch (error) {
		logger.error('HTTP server error');
		throw error;
	}
}

export default httpServer;
