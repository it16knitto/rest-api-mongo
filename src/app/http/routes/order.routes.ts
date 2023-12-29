import { Router, requestHandler } from '@knittotextile/knitto-core-backend';
import authorizeMiddlware from '../middleware/auth/authorization';
import { createOrder, getOrder, saveOrder } from '../controller/order/Order.controller';
import validateRequest from '../middleware/validate/validateRequest';
import { OrderDto } from '../controller/order/Order.dto';

const orderRouter = Router();

orderRouter.get('/order', authorizeMiddlware, requestHandler(getOrder));
orderRouter.post('/order', authorizeMiddlware, validateRequest({ requestType: 'body', type: OrderDto }), requestHandler(createOrder));
orderRouter.post('/order/:uuid', authorizeMiddlware, requestHandler(saveOrder));

export default orderRouter;
