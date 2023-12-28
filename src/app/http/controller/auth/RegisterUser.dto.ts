/* eslint-disable @typescript-eslint/indent */
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
	@IsNotEmpty()
	@IsString()
	nama: string;

	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty({ message: 'password tidak boleh kosong' })
	@IsString({ message: 'password harus string' })
	@MaxLength(30, { message: 'panjang maksimal password 30' })
	@MinLength(5, { message: 'minimal panjang password 5' })
	password: string;
};
