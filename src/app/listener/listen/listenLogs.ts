import { Channel } from 'amqplib';
import configuration from '../../../config';
import { EventMessageData } from '../../../types/listenerQueue';
import CreateLogs from '../../../services/CreateLogs';
const queueName = 'backendLogs';

async function listenLogs(channel: Channel) {
	const { queue } = await channel.assertQueue(queueName, { durable: true });

	channel.bindQueue(queue, configuration.RABBITMQ_EXCHANGE, '#');
	channel.prefetch(1);
	console.info('RabbitMQ can receive message');

	channel.consume(queue, (message) => {
		if (message?.content) {
			console.info(`Receive on Consumer 1: ${message.content.toString()}`);
			const contentString = message.content.toString();
			const messageJson = JSON.parse(contentString) as EventMessageData;
			new CreateLogs(messageJson).create()
				.then(() => {
					channel.ack(message);
				})
				.catch(() => {
					//
				});
		}
	});
};

export default listenLogs;
