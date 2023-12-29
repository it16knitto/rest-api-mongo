/* eslint-disable @typescript-eslint/indent */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDetailDto {
	@IsNotEmpty()
	@IsString()
	order_uuid: string;

	@IsNotEmpty()
	@IsString()
	product_uuid: string;

	@IsNotEmpty()
	@IsNumber()
	qty: number;
};
