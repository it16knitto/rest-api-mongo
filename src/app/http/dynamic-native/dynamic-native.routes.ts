import {
	requestHandler,
	requestValidator,
	Router
} from '@knittotextile/knitto-http';
import dynamicNativeRequest from './dynamic-native.request';
import {
	getAllField,
	getDynamicnativeData,
	getFieldNames,
	postDataDynamic
} from './dynamic-native.controller';

const dynamicNativeRouter = Router();
/**
 * POST /dynamic-native/list/dynamic-data
 * @tags Dynamic Native
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
dynamicNativeRouter.post(
	'/dynamic-native/list/dynamic-data',
	requestValidator({
		requestType: 'body',
		type: dynamicNativeRequest.dynamicNativeData
	}),
	requestHandler(getDynamicnativeData)
);

/**
 * GET /dynamic-native/list/field-names
 * @tags Dynamic Native
 * @summary get field names
 * @return {object} 200 - success
 * @example response - 200 - success
 * {
 * 	"message": "Success",
 * 	"result": {
 * 		"data": []
 * 	}
 * }
 */
dynamicNativeRouter.get(
	'/dynamic-native/list/field-names',
	requestHandler(getFieldNames)
);

/**
 * POST /dynamic-native/
 * @tags Dynamic Native
 * @summary get field names
 * @param {object} request.body.required - dynamic data request
 * @return {object} 200 - success
 * @example response - 200 - success
 * {
 * 	"message": "Success",
 * 	"result": []
 * }
 */
dynamicNativeRouter.post('/dynamic-native/', requestHandler(postDataDynamic));

/**
 * GET /dynamic-native/fields
 * @tags Dynamic Native
 * @summary get field names
 * @return {object} 200 - success
 * @example response - 200 - success
 * {
 * 	"message": "Success",
 * 	"result": []
 * }
 */
dynamicNativeRouter.get('/dynamic-native/fields', requestHandler(getAllField));

export default dynamicNativeRouter;
