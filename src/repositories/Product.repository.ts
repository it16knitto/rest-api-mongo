import { EntityRepo } from '@knittotextile/knitto-core-backend';
import { v4 as uuidv4 } from 'uuid';
import { ProductEntity } from '../entity/Product.entity';

export default class ProductRepository extends EntityRepo<ProductEntity | { uuid: string }> {
	tableName = 'products';
	async insert(data: ProductEntity): Promise<unknown> {
		data.uuid = uuidv4();
		data.createdAt = new Date();
		return await super.insert(data);
	}

	async getAll(param: { perPage: number, page: number }) {
		const { perPage, page } = param;

		const data = await this.dbConnector.basicPaginate({
			query: 'SELECT * FROM products',
			perPage,
			page
		});

		return data;
	}
};
