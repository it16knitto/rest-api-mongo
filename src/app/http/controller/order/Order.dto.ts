/* eslint-disable @typescript-eslint/indent */
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDto {
	@IsNotEmpty()
	@IsDateString()
	tanggal: Date;

	@IsNotEmpty()
	@IsNumber()
	total: number;
};
