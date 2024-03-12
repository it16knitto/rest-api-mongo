import { Router, requestHandler } from '@knittotextile/knitto-http';
import { defaultController } from '../controller/default/default.controller';

const defaultRouter = Router();

defaultRouter.get('/', requestHandler(defaultController));

export default defaultRouter;
