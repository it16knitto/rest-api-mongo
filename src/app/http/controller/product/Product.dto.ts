/* eslint-disable @typescript-eslint/indent */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
	@IsNotEmpty()
	@IsString()
	kode: string;

	@IsNotEmpty()
	@IsString()
	nama: string;

	@IsNotEmpty()
	@IsString()
	deskripsi: string;

	@IsNotEmpty()
	@IsNumber()
	harga: number;
};
