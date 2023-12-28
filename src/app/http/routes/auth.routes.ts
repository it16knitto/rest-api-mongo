import { Router, requestHandler } from '@knittotextile/knitto-core-backend';
import { authCheckMe, authLogin, authRefreshToken, authRegister } from '../controller/auth/Auth.controller';
import { RegisterUserDto } from '../controller/auth/RegisterUser.dto';
import validateRequest from '../middleware/validate/validateRequest';
import authorizeMiddlware from '../middleware/auth/authorization';
const authRouter = Router();

authRouter.post('/auth/register', validateRequest({ type: RegisterUserDto, requestType: 'body' }), requestHandler(authRegister));
authRouter.post('/auth/login', requestHandler(authLogin));
authRouter.post('/auth/refresh', authorizeMiddlware, requestHandler(authRefreshToken));
authRouter.post('/auth/me', authorizeMiddlware, requestHandler(authCheckMe));

export default authRouter;
