import { Router, requestHandler } from '@knittotextile/knitto-core-backend';
import { createProduct, deleteProduct, getOneProduct, getProduct, updateProduct } from '../controller/product/Product.controller';
import authorizeMiddlware from '../middleware/auth/authorization';
import validateRequest from '../middleware/validate/validateRequest';
import { ProductDto } from '../controller/product/Product.dto';

const productRouter = Router();

productRouter.get('/products', authorizeMiddlware, requestHandler(getProduct));
productRouter.get('/products/:uuid', authorizeMiddlware, requestHandler(getOneProduct));
productRouter.post('/products', authorizeMiddlware, validateRequest({ requestType: 'body', type: ProductDto }), requestHandler(createProduct));
productRouter.patch(
	'/products/:uuid',
	authorizeMiddlware,
	validateRequest({ requestType: 'body', type: ProductDto }),
	requestHandler(updateProduct)
);
productRouter.delete('/products/:uuid', authorizeMiddlware, requestHandler(deleteProduct));

export default productRouter;
