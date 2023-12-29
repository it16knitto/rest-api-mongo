import { Router, requestHandler } from '@knittotextile/knitto-core-backend';
import authorizeMiddlware from '../middleware/auth/authorization';
import { createOrderDetail, deleteOrderDetail, getOneOrderDetail, getOrderDetail } from '../controller/order-detail/orderDetail.controller';
import validateRequest from '../middleware/validate/validateRequest';
import { OrderDetailDto } from '../controller/order-detail/orderDetail.controller.dto';

const orderDetailRouter = Router();

orderDetailRouter.get('/order-detail', authorizeMiddlware, requestHandler(getOrderDetail));
orderDetailRouter.get('/order-detail/:uuid', authorizeMiddlware, requestHandler(getOneOrderDetail));
orderDetailRouter.post(
	'/order-detail',
	authorizeMiddlware,
	validateRequest({ requestType: 'body', type: OrderDetailDto }),
	requestHandler(createOrderDetail)
);
orderDetailRouter.delete('/order-detail/:uuid', authorizeMiddlware, requestHandler(deleteOrderDetail));

export default orderDetailRouter;
