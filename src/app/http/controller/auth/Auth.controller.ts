import { Exception, ExpressType, TRequestFunction } from '@knittotextile/knitto-core-backend';
import { RegisterUserDto } from './RegisterUser.dto';
import UserRepository from '../../../../repositories/User.repository';
import { connectionMysql } from '../../../../config/dbConnection';
import bcryptjs from 'bcryptjs';
import { UserEntity } from '../../../../entity/User.entity';
import CreateCredentialJWT from '../../../../services/CreateCredentialJWT';
import sendLogs from '../../../listener/send/sendLogs';

const authRegister: TRequestFunction = async (req: ExpressType.Request) => {
	const userDto = req.body as RegisterUserDto;
	const userRepo = new UserRepository(connectionMysql);

	const createUser = await userRepo.insert({
		nama: userDto.nama,
		username: userDto.username,
		password: bcryptjs.hashSync(String(userDto.password), 8)
	});

	return { result: createUser };
};

const authLogin: TRequestFunction = async (req: ExpressType.Request) => {
	const { username, password } = req.body;
	if (username === undefined || password === undefined) throw new Exception.InvalidParameterException('Method tidak sesuai');

	const checkUser: UserEntity = await connectionMysql.raw('SELECT * FROM users WHERE username = ? LIMIT 1', [username])
		.then(res => res[0]);
	if (checkUser) {
		const passwordCheck = bcryptjs.compareSync(String(password), checkUser.password);
		if (!passwordCheck) throw new Exception.NotAuthorizationException('not authorized');

		try {
			const token = await new CreateCredentialJWT(checkUser.uuid).generateToken();
			sendLogs({
				id: Date.now(),
				eventName: 'login',
				data: []
			});

			return {
				result: {
					user: {
						uuid: checkUser.uuid,
						username: checkUser.username,
						nama: checkUser.nama
					},
					token
				}
			};
		} catch (error) {
			throw new Exception.NotAuthorizationException('User not authorized');
		}
	} else {
		throw new Exception.NotFoundException('User not found');
	}
};

const authRefreshToken: TRequestFunction = async (req: ExpressType.Request) => {
	const token = await new CreateCredentialJWT(String(req.params.userUuid)).generateToken();
	return { result: { token } };
};

const authCheckMe: TRequestFunction = async (req: ExpressType.Request) => {
	const user = await connectionMysql.raw('SELECT username, nama FROM users WHERE uuid = ?', [req.params.userUuid]).then(user => user[0]);
	return { result: user };
};

export { authRegister, authLogin, authRefreshToken, authCheckMe };
