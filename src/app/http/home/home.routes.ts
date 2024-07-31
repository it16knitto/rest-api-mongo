import { Router, requestHandler } from '@knittotextile/knitto-http';
import {  home } from './home.controller';

const defaultRouter = Router();

defaultRouter.get('/', requestHandler(home));

export default defaultRouter;
