import { Exception, ExpressType, TRequestFunction } from '@knittotextile/knitto-core-backend';
import OrderRepository from '../../../../repositories/Order.repository';
import { connectionMysql } from '../../../../config/dbConnection';
import { OrderEntity } from '../../../../entity/Order.entity';
import { OrderDto } from './Order.dto';
import createDate from '../../../../libs/helpers/formatDate';
import { CounterEntity } from '../../../../entity/Counter.entity';
import CounterRepository from '../../../../repositories/Counter.repository';
import sendLogs from '../../../listener/send/sendLogs';

const getOrder: TRequestFunction = async (req: ExpressType.Request) => {
	const page = Number(req.query.page) || 1;
	const perPage = Number(req.query.perPage) || 10;

	const orderRepo = new OrderRepository(connectionMysql);
	const orders = await orderRepo.getAll({ page, perPage });
	return { result: orders };
};

const getOneOrder: TRequestFunction = async (req: ExpressType.Request) => {
	const uuid = req.params.uuid;
	const order = await connectionMysql.raw<OrderEntity[]>('SELECT * FROM orders where uuid = ?', [uuid])
		.then(result => result[0]);
	return { result: order };
};

const createOrder: TRequestFunction = async (req: ExpressType.Request) => {
	const orderDto = req.body as OrderDto;
	const userUuid = req.params.userUuid;
	const orderRepo = new OrderRepository(connectionMysql);
	const insertOrder = await orderRepo.insert({
		user_uuid: userUuid,
		tanggal: orderDto.tanggal,
		total: orderDto.total
	});

	return { result: insertOrder };
};

const saveOrder: TRequestFunction = async (req: ExpressType.Request) => {
	const uuid = req.params.uuid;
	const checkOrder = await connectionMysql.raw<OrderEntity[]>('SELECT * FROM orders WHERE uuid = ? AND no_order is Null', [uuid])
		.then(order => order[0]);

	if (!checkOrder) throw new Exception.NotFoundException('Order tidak ditemukan');

	const kode = 'OJ' + createDate(new Date(), 'YYMM') + '00000';
	const checkCounter = await connectionMysql.raw<CounterEntity[]>('SELECT * FROM counters where no_generate = ? ', [kode])
		.then(counter => counter[0]);

	await connectionMysql.transaction(async (conn) => {
		const repoCounter = new CounterRepository(conn);
		let noOrder: string;
		if (checkCounter) {
			conn.raw('UPDATE counters SET updatedAt = ? where no_generate = ?', [new Date(), kode]);
			noOrder = kode.substring(0, kode.length - String(checkCounter.count).length) + String(checkCounter.count);
		} else {
			repoCounter.insert({
				no_generate: kode,
				count: 1
			});
			noOrder = kode.substring(0, kode.length - 1) + '1';
		}

		const sumNilai = await conn.raw('SELECT SUM(nilai) as nilai from order_details od WHERE order_uuid  = ?', [uuid]);

		conn.raw('UPDATE orders SET no_order = ?, total = ? WHERE uuid = ?', [noOrder, sumNilai[0].nilai, uuid]);
		conn.raw('UPDATE counters SET count = count + 1 WHERE no_generate = ?', [kode]);
	});

	const order = await connectionMysql.raw<OrderEntity[]>('SELECT * FROM orders WHERE uuid = ?', [uuid]).then(order => order[0]);

	sendLogs({
		id: Date.now(),
		eventName: 'create.order',
		data: order
	});
	return { result: 'Faktur berhasil dibuat' };
};

export { getOrder, getOneOrder, createOrder, saveOrder };
