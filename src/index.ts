import './libs/helpers/initModuleAlias';
import { dump } from '@knittotextile/knitto-core-backend';
import httpServer from '@http/index';
import mongoose from 'mongoose';
import { mongoConfig } from './libs/config';
import { mongoDBClient } from './services/mongodb.service';

// import messageBroker from '@root/app/messageBroker';
// import mysqlConnection from './libs/config/mysqlConnection';
// import rabbitConnection from './libs/config/rabbitConnection';
// const clientOptions = {
// 	serverApi: {
// 		version: '1' as const,
// 		strict: false,
// 		deprecationErrors: false,
// 		useNewUrlParser: true,
// 		useUnifiedTopology: false
// 	}
// };
(async () => {
	try {
		// start infrastructure
		// await mysqlConnection.init();
		// await rabbitConnection.init();
		// await mongooseConnection();
		if (!mongoConfig.URI || typeof mongoConfig.URI !== 'string') {
			throw new Error('Invalid MongoDB connection string');
		}
		await mongoose.connect(mongoConfig.URI);
		await mongoDBClient.connect();
		// Ganti dengan nama database Anda

		// start application
		await httpServer();
		// await messageBroker();
	} catch (error) {
		dump(error);
		process.exit(1);
	}
})();
