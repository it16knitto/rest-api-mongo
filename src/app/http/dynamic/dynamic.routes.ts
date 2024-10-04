import {
	requestHandler,
	requestValidator,
	Router
} from '@knittotextile/knitto-http';
import {
	dynamicCreate,
	dynamicDelete,
	dynamicFindAll,
	dynamicFindById,
	dynamicUpdate,
	findDynamicField,
	findFieldUnique,
	getDynamicData
} from './dynamic.controller';
import dynamicRequest from './dynamic.request';
const dynamicRouter = Router();
/**
 * POST /dynamic
 * @tags Dynamic
 * @summary create a new dynamic
 * @param {object} request.body.required - dynamic creation request
 * @return {object} 201 - success
 * @example response - 201 - success
 * {
 * 	"message": "Success",
 * 	"result": null
 * }
 */
dynamicRouter.post('/dynamic', requestHandler(dynamicCreate));
/**
 * GET /dynamic
 * @tags Dynamic
 * @summary get all dynamic
 * @param {string} search.query - string
 * @param {number} perPage.query.required - number
 * @param {number} page.query.required - number
 * @return {object} 200 - success
 * @example response - 200 - success
 * {
 * 	"message": "Success",
 * 	"result": "OBJECT"
 * }
 */
dynamicRouter.get(
	'/dynamic',
	requestValidator({
		requestType: 'query',
		type: dynamicRequest.getDynamicValidation
	}),
	requestHandler(dynamicFindAll)
);
/**
 * GET /dynamic/{id}
 * @tags Dynamic
 * @summary get dynamic by id
 * @param {string} id.path.required - id
 * @return {object} 200 - success
 * @example response - 200 - success
 * {
 * 	"message": "Success",
 * 	"result": {}
 * }
 */
dynamicRouter.get('/dynamic/:id', requestHandler(dynamicFindById));
/**
 * PUT /dynamic/{id}
 * @tags Dynamic
 * @summary update dynamic by id
 * @param {string} id.path.required - id
 * @param {object} request.body.required - dynamic update request
 * @return {object} 200 - success
 * @example response - 200 - success
 * {
 * 	"message": "Success",
 * 	"result": {}
 * }
 */
dynamicRouter.put('/dynamic/:id', requestHandler(dynamicUpdate));
/**
 * DELETE /dynamic/{id}
 * @tags Dynamic
 * @summary delete dynamic by id
 * @param {string} id.path.required - id
 * @return {object} 200 - success
 * @example response - 200 - success
 * {
 * 	"message": "Success",
 * 	"result": null
 * }
 */
dynamicRouter.delete('/dynamic/:id', requestHandler(dynamicDelete));
/**
 * GET /dynamic/field/list
 * @tags Dynamic
 * @summary find unique field
 * @return {object} 200 - success
 * @example response - 200 - success
 * {
 * 	"message": "Success",
 * 	"result": []
 * }
 */
dynamicRouter.get('/dynamic/field/list', requestHandler(findFieldUnique));

/**
 * POST /dynamic/list/dynamic-search
 * @tags Dynamic
 * @summary find dynamic field based on search criteria
 * @param {object} request.body.required - dynamic search request
 * @return {object} 200 - success
 * @example request - non-search criteria
 * {
 *   "search": [],"page": 1,"perPage": 10
 * }
 * @example request - example search multiple criteria
 * {
 *   "search": [
 *     {
 *       "operation": "and",
 *       "conditions": [
 *         {
 *           "field": "field_a",
 *           "value": "1",
 *           "operator": "equal"
 *         },
 *         {
 *           "field": "field_b",
 *           "value": "2",
 *           "operator": "greater"
 *         }
 *       ]
 *     },
 *     {
 *       "operation": "or",
 *       "conditions": [
 *         {
 *           "field": "field_c",
 *           "value": "3",
 *           "operator": "equal"
 *         }
 *       ]
 *     }
 *   ],
 *   "page": 1,
 *   "perPage": 10
 * }
 * @example response - 200 - success
 * {
 *   "message": "Success",
 *   "result": []
 * }
 */
dynamicRouter.post(
	'/dynamic/list/dynamic-search',
	requestValidator({
		requestType: 'body',
		type: dynamicRequest.getDynamicSearchValidation
	}),
	requestHandler(findDynamicField)
);
/**
 * POST /dynamic/list/dynamic-data
 * @tags Dynamic
 * @summary get dynamic data based on search criteria
 * @param {object} request.body.required - dynamic data request
 * @return {object} 200 - success
 * @example request - 200 - success
 * {
 * 	"search": [],
 * 	"page": 1,
 * 	"perPage": 10
 * }
 * @example request - example search multiple criteria
 * {
 * 	"search": [
 * 		{
 * 			"field": "field_a",
 * 			"value": "1",
 * 			"operator": "equal"
 * 		}
 * 	],
 * 	"page": 1,
 * 	"perPage": 10
 * }
 * @example response - 200 - success
 * {
 * 	"message": "Success",
 * 	"result": {
 * 		"data": [],
 * 		"meta": {}
 * 	}
 * }
 */
dynamicRouter.post(
	'/dynamic/list/dynamic-data',
	requestValidator({
		requestType: 'body',
		type: dynamicRequest.getDynamicDataValidation
	}),
	requestHandler(getDynamicData)
);
export default dynamicRouter;
