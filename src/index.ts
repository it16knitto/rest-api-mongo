import { logger } from '@knittotextile/knitto-core-backend';
import httpServer from './app/http';
import messageBroker from './app/messageBroker';
import { connectionMysql } from './libs/config/dbConnection';
import { rabbitConnection } from './libs/config/rabbitConnection';

async function startApp() {
	try {
		await httpServer();
		await connectionMysql.init();
		await rabbitConnection.init();
		await messageBroker();
	} catch (error) {
		logger.error(error);
		throw error;
	}
}

startApp();

export default startApp;
