import { logger } from '@knittotextile/knitto-core-backend';
import { connectionMysql } from '../config/dbConnection';
import LogRepository from '../repositories/Log.repository';
import { EventMessageData } from '../types/listenerQueue';

class CreateLogs {
	constructor(private readonly eventMessage: EventMessageData) {}

	async create() {
		const logRepo = new LogRepository(connectionMysql);

		const createLog = await logRepo.insert({
			keterangan: JSON.stringify(this.eventMessage)
		});

		logger.info(JSON.stringify(this.eventMessage));

		return createLog;
	}
};

export default CreateLogs;
