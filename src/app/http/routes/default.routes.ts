import { Router, requestHandler } from '@knittotextile/knitto-core-backend';
import { defaultController } from '../controller/default/default.controller';

const defaultRouter = Router();

defaultRouter.get('/', requestHandler(defaultController));

export default defaultRouter;
