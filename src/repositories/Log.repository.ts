import { EntityRepo } from '@knittotextile/knitto-core-backend';
import { v4 as uuidv4 } from 'uuid';
import { LogEntity } from '../entity/Log.entity';

export default class LogRepository extends EntityRepo<LogEntity> {
	tableName = 'logs';
	async insert(data: LogEntity): Promise<unknown> {
		data.uuid = uuidv4();
		data.createdAt = new Date();
		return await super.insert(data);
	}
};
