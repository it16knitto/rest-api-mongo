import './libs/helpers/initModuleAlias';
import { logger } from '@knittotextile/knitto-core-backend';
import httpServer from '@http/index';
import messageBroker from '@root/app/messageBroker';
import { connectionMysql } from '@root/libs/config/dbConnection';
import { rabbitConnection } from '@root/libs/config/rabbitConnection';

(
	async() => {
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
)();
