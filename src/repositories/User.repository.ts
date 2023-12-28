import { EntityRepo } from '@knittotextile/knitto-core-backend';
import { UserEntity } from '../entity/User.entity';
import { v4 as uuidv4 } from 'uuid';
import randomString from '../libs/helpers/randomString';

export default class UserRepository extends EntityRepo<UserEntity> {
	tableName = 'users';
	async insert(data: UserEntity): Promise<unknown> {
		data.uuid = uuidv4();
		data.kode = randomString(5);
		return await super.insert(data);
	}
};
