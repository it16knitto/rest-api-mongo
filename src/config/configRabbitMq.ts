import amqp, { Channel, Connection } from 'amqplib';
import configuration from '.';
import { logger } from '@knittotextile/knitto-core-backend';

let channel: Channel, connection: Connection;

async function configRabbitMq(): Promise<Channel & Connection | any> {
	try {
		connection = await amqp.connect(configuration.RABBITMQ_URL);
		channel = await connection.createChannel();
		await channel.assertExchange(configuration.RABBITMQ_EXCHANGE, 'topic', { durable: true });
		logger.info('RabbitMQ Conneted');
		return { channel, connection };
	} catch (error) {
		logger.error({ error });
		return error;
	};
}

export default configRabbitMq;
