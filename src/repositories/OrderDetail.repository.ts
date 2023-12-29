import { EntityRepo } from '@knittotextile/knitto-core-backend';
import { v4 as uuidv4 } from 'uuid';
import { OrderDetailEntity } from '../entity/OrderDetail.entity';

export default class OrderDetailRepository extends EntityRepo<OrderDetailEntity | { uuid: string }> {
	tableName = 'order_details';
	async insert(data: OrderDetailEntity): Promise<unknown> {
		data.uuid = uuidv4();
		data.createdAt = new Date();
		return await super.insert(data);
	}

	async getAll(param: { perPage: number, page: number, order: string }) {
		const { perPage, page, order } = param;

		const data = await this.dbConnector.basicPaginate({
			query: `SELECT * FROM order_details WHERE order_uuid = '${order}'`,
			perPage,
			page
		});

		return data;
	}
};
