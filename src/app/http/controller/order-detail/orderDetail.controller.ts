import { Exception, ExpressType, TRequestFunction } from '@knittotextile/knitto-core-backend';
import OrderDetailRepository from '../../../../repositories/OrderDetail.repository';
import { connectionMysql } from '../../../../config/dbConnection';
import { OrderDetailEntity } from '../../../../entity/OrderDetail.entity';
import { OrderDetailDto } from './orderDetail.controller.dto';
import { OrderEntity } from '../../../../entity/Order.entity';

const getOrderDetail: TRequestFunction = async (req: ExpressType.Request) => {
	const page = Number(req.query.page) || 1;
	const perPage = Number(req.query.perPage) || 10;
	const orderUuid = req.query.order;

	if (orderUuid === undefined) throw new Exception.InvalidParameterException('uuid must be declared');

	const orderDetailRepo = new OrderDetailRepository(connectionMysql);
	const orderDetail = await orderDetailRepo.getAll({ page, perPage, order: orderUuid });
	return { result: orderDetail };
};

const getOneOrderDetail: TRequestFunction = async (req: ExpressType.Request) => {
	const uuid = req.params.uuid;
	if (uuid === undefined) throw new Exception.InvalidParameterException('uuid is required');

	const order = await connectionMysql.raw<OrderDetailEntity[]>('SELECT * FROM order_details WHERE uuid = ?', [uuid])
		.then(order => order[0]);

	if (order) {
		return { result: order };
	} else {
		throw new Exception.NotFoundException('Order detail not found');
	}
};

const createOrderDetail: TRequestFunction = async (req: ExpressType.Request) => {
	const orderDetailDto = req.body as OrderDetailDto;
	const { userUuid } = req.params;

	const product = await connectionMysql.raw<OrderDetailEntity[]>('SELECT * FROM products WHERE uuid = ?', [orderDetailDto.product_uuid])
		.then(product => product[0]);

	if (!product) throw new Exception.NotFoundException('Product not found');

	const order = await connectionMysql.raw<OrderEntity[]>('SELECT * FROM orders where uuid = ?', [orderDetailDto.order_uuid])
		.then(order => order[0]);

	if (!order) throw new Exception.NotFoundException('Order not found');

	const orderDetailRepo = new OrderDetailRepository(connectionMysql);
	const insertOrder = await orderDetailRepo.insert({
		user_uuid: userUuid,
		product_uuid: product.uuid,
		qty: orderDetailDto.qty,
		harga: product.harga,
		nilai: product.harga * orderDetailDto.qty,
		order_uuid: order.uuid
	});

	return { result: insertOrder };
};

const deleteOrderDetail: TRequestFunction = async (req: ExpressType.Request) => {
	const uuid = req.params.uuid;
	const orderDetail = await connectionMysql.raw<OrderDetailEntity[]>('SELECT * FROM order_details where uuid = ?', [uuid])
		.then(orderDetail => orderDetail[0]);

	if (!orderDetail) throw new Exception.NotFoundException('Order not found');

	const orderDetailRepo = new OrderDetailRepository(connectionMysql);
	const removeOrderDetail = await orderDetailRepo.remove({
		uuid
	});

	return { result: removeOrderDetail };
};

export { getOrderDetail, getOneOrderDetail, createOrderDetail, deleteOrderDetail };
