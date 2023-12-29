import { Channel } from 'amqplib';
import configuration from '../../../config';
import { EventMessageData } from '../../../types/listenerQueue';
import { logger } from '@knittotextile/knitto-core-backend';
const queueName = 'backendLogs';

async function listenLogs(channel: Channel) {
	const { queue } = await channel.assertQueue(queueName, { durable: true });

	channel.bindQueue(queue, configuration.RABBITMQ_EXCHANGE, '#');
	channel.prefetch(1);
	logger.info('RabbitMQ can receive message');

	channel.consume(queue, (message) => {
		if (message?.content) {
			logger.info(`Receive on ${queueName}: ${message.content.toString()}`);
			const contentString = message.content.toString();
			const messageJson = JSON.parse(contentString) as EventMessageData;
			logger.info(messageJson);
			// ?: do somthing
			// new CreateLogs(messageJson).create()
			// 	.then(() => {
			// 		channel.ack(message);
			// 	})
			// 	.catch(() => {
			// 	});
		}
	});
};

export default listenLogs;
