import KnittoRabbitMQ from '@knittotextile/knitto-rabbitmq';
import configuration from '.';

export const rabbitConnection = new KnittoRabbitMQ({
	connectionName: 'rabbit-connection',
	url: configuration.RABBITMQ_URL
});
