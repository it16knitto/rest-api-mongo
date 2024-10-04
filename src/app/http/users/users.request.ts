import { InferOutput, object, string } from 'valibot';
import { ERROR_VALIDATION_MSG } from '@root/libs/config/errorMessage';

const postUserValidation = object({
	name: string(ERROR_VALIDATION_MSG.string('name')),
	email: string(ERROR_VALIDATION_MSG.string('email')),
	password: string(ERROR_VALIDATION_MSG.string('password'))
});

export type TPostUserValidation = InferOutput<typeof postUserValidation>;
export default { postUserValidation };
