import { EntityRepo } from '@knittotextile/knitto-core-backend';
import { v4 as uuidv4 } from 'uuid';
import { CounterEntity } from '../entity/Counter.entity';

export default class CounterRepository extends EntityRepo<CounterEntity> {
	tableName = 'counters';
	async insert(data: CounterEntity): Promise<unknown> {
		data.uuid = uuidv4();
		data.createdAt = new Date();
		return await super.insert(data);
	}
};
