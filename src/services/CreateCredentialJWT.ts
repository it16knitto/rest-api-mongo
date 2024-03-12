import configuration from '../libs/config';
import jwt from 'jsonwebtoken';
import { connectionMysql } from '../libs/config/dbConnection';
import { UserEntity } from '../entity/User.entity';
class CreateCredentialJWT {
	constructor(private readonly uuid: string) {}

	async generateToken(): Promise<string | null> {
		const checkUser = await connectionMysql.raw<UserEntity[]>('SELECT * FROM users WHERE uuid = ? LIMIT 1', [this.uuid]).then(res => res[0]);

		if (checkUser) {
			const token = jwt.sign({
				uuid: checkUser.uuid,
				nama: checkUser.nama,
				username: checkUser.username
			}, configuration.APP_SECRET_KEY, { expiresIn: '7d' });
			return token;
		} else {
			return null;
		}
	}
}

export default CreateCredentialJWT;
