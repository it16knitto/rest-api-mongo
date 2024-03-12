import { EntityRepo } from '@knittotextile/knitto-mysql';
import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from '../entity/Order.entity';

export default class OrderRepository extends EntityRepo<OrderEntity> {
	tableName = 'orders';
	async insert(data: OrderEntity): Promise<unknown> {
		data.uuid = uuidv4();
		data.createdAt = new Date();
		return await super.insert(data);
	}

	async getAll(param: { perPage: number, page: number }) {
		const { perPage, page } = param;

		const data = await this.dbConnector.basicPaginate({
			query: 'SELECT * FROM orders',
			perPage,
			page
		});

		return data;
	}
};
