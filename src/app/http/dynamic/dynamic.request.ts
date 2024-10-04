import {
	any,
	array,
	InferOutput,
	minValue,
	number,
	object,
	optional,
	pipe,
	string,
	transform
} from 'valibot';
import { ERROR_VALIDATION_MSG } from '@root/libs/config/errorMessage';

const getDynamicValidation = object({
	search: optional(string(ERROR_VALIDATION_MSG.string('search'))),
	page: pipe(
		any(),
		transform((input) => parseInt(input, 10)),
		number(ERROR_VALIDATION_MSG.number('Page')),
		minValue(0, ERROR_VALIDATION_MSG.minValue('Page', 0))
	),
	perPage: pipe(
		any(),
		transform((input) => parseInt(input, 10)),
		number(ERROR_VALIDATION_MSG.number('Per Page')),
		minValue(5, ERROR_VALIDATION_MSG.minValue('Per Page', 10))
	)
});
export type TGetDynamicValidation = InferOutput<typeof getDynamicValidation>;

const getDynamicSearchValidation = object({
	search: array(
		object({
			operation: optional(string(ERROR_VALIDATION_MSG.string('Operation'))),
			conditions: array(
				object({
					field: string(ERROR_VALIDATION_MSG.string('Field')),
					value: any(),
					operator: string(ERROR_VALIDATION_MSG.string('Operator'))
				})
			)
		})
	),
	page: pipe(
		any(),
		transform((input) => parseInt(input, 10)),
		number(ERROR_VALIDATION_MSG.number('Page')),
		minValue(0, ERROR_VALIDATION_MSG.minValue('Page', 0))
	),
	perPage: pipe(
		any(),
		transform((input) => parseInt(input, 10)),
		number(ERROR_VALIDATION_MSG.number('Per Page')),
		minValue(5, ERROR_VALIDATION_MSG.minValue('Per Page', 10))
	)
});
export type TGetDynamicSearchValidation = InferOutput<
	typeof getDynamicSearchValidation
>;

const getDynamicDataValidation = object({
	search: optional(
		array(
			object({
				field: string(ERROR_VALIDATION_MSG.string('Field')),
				value: any(),
				operator: string(ERROR_VALIDATION_MSG.string('Operator'))
			})
		)
	),
	page: pipe(
		any(),
		transform((input) => parseInt(input, 10)),
		number(ERROR_VALIDATION_MSG.number('Page')),
		minValue(0, ERROR_VALIDATION_MSG.minValue('Page', 0))
	),
	perPage: pipe(
		any(),
		transform((input) => parseInt(input, 10)),
		number(ERROR_VALIDATION_MSG.number('Per Page')),
		minValue(5, ERROR_VALIDATION_MSG.minValue('Per Page', 10))
	)
});
export type TGetDynamicDataValidation = InferOutput<
	typeof getDynamicDataValidation
>;
export default {
	getDynamicValidation,
	getDynamicSearchValidation,
	getDynamicDataValidation
};
