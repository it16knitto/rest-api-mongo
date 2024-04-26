import configuration from '@root/libs/config';
import { EventMessageData } from '@root/libs/types/listenerQueue';
import { rabbitConnection } from '@root/libs/config/rabbitConnection';
import { logger } from '@knittotextile/knitto-core-backend';

async function sendLogs(message: EventMessageData) {
	try {
		await rabbitConnection.publishMessage(message, { exchangeName: configuration.RABBITMQ_EXCHANGE, routingKey: message.eventName });
	} catch (err) {
		logger.error(err);
		throw err;
	}
}

export default sendLogs;
