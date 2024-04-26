import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class BasicPaginateDto {
	@IsNotEmpty()
	@IsNumber()
	@Transform(({ value }: { value: string }) => parseInt(value, 10))
		page: number;

	@IsNotEmpty()
	@IsNumber()
	@Transform(({ value }: { value: string }) => parseInt(value, 10))
		perPage: number;
}
