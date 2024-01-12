import { Channel } from 'amqplib';
import listenLogs from './listen/listenLogs';
import configRabbitMq from '../../config/configRabbitMq';
import { logger } from '@knittotextile/knitto-core-backend';

async function listener() {
	try {
		configRabbitMq()
			.then(async result => {
				const channel = result.channel as Channel;

				await listenLogs(channel);
			}).catch(error => {
				throw error;
			});
	} catch (error) {
		logger.error(error);
	}
}

export default listener;
