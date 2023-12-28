import { Channel, Connection } from 'amqplib';
import configuration from '../../../config';
import { EventMessageData } from '../../../types/listenerQueue';
import configRabbitMq from '../../../config/configRabbitMq';

function sendLogs(message: EventMessageData, topic: string) {
	configRabbitMq()
		.then(async result => {
			const channel = result.channel as Channel;
			const connection = result.connection as Connection;

			try {
				channel.publish(configuration.RABBITMQ_EXCHANGE, topic, Buffer.from(JSON.stringify(message)), { persistent: true });
			} catch (error) {

			} finally {
				setTimeout(() => {
					channel.close();
					connection.close();
				}, 3000);
			}
		}).catch(error => {
			throw error;
		});
}

export default sendLogs;
