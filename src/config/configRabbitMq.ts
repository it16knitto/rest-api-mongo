import amqp, { Channel, Connection } from 'amqplib';
import configuration from '.';

let channel: Channel, connection: Connection;

async function configRabbitMq(): Promise<Channel & Connection | any> {
	try {
		connection = await amqp.connect(configuration.RABBITMQ_URL);
		channel = await connection.createChannel();
		await channel.assertExchange(configuration.RABBITMQ_EXCHANGE, 'topic', { durable: true });
		console.info('RabbitMQ Conneted');
		return { channel, connection };
	} catch (error) {
		console.error({ error });
		return error;
	};
}

export default configRabbitMq;
