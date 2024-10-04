import {
	Router,
	requestHandler,
	requestValidator
} from '@knittotextile/knitto-http';
import usersRequest from './users.request';
import { userCreate, userFindAll, userFindOne } from './users.controller';

const usersRouter = Router();
/**
 * GET /users
 * @tags Users
 * @summary get all users
 * @return {object} 200 - success
 * @example response - 200 - success
 * {
 * 	"message": "Success",
 * 	"result": []
 * }
 */
usersRouter.get('/users', requestHandler(userFindAll));
/**
 * POST /users
 * @tags Users
 * @summary create a new user
 * @typedef {object} UserCreate
 * @property {string} name.required - The user name
 * @property {string} email.required - The user email
 * @property {string} password.required - The user password
 * @param {UserCreate} request.body.required - user creation request
 * @return {object} 201 - success
 * @example response - 201 - success
 * {
 * 	"message": "Success",
 * 	"result": null
 * }
 */
usersRouter.post(
	'/users',
	requestValidator({
		requestType: 'body',
		type: usersRequest.postUserValidation
	}),
	requestHandler(userCreate)
);
/**
 * GET /users/{uuid}
 * @tags Users
 * @summary get a user by uuid
 * @param {string} uuid.path - The user uuid
 * @return {object} 200 - success
 * @example response - 200 - success
 * {
 * 	"message": "Success",
 * 	"result" : {}
 * }
 */
usersRouter.get('/users/:uuid', requestHandler(userFindOne));
export default usersRouter;
