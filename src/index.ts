import httpServer from './app/http';
import listener from './app/listener';
import { connectionMysql } from './config/dbConnection';

(
	async () => {
		try {
			await connectionMysql.init();
			await listener();
			await httpServer();
		} catch (error) {
			console.error(error);
		}
	}
)();
