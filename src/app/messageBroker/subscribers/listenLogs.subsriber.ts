import rabbitSubscribers from '@knittotextile/knitto-rabbitmq/dist/rabbit-subscriber';
import configuration from '@root/libs/config';
const queueName = 'backendLogs';

const listenLogs = rabbitSubscribers();

listenLogs.add({
	exchangeName: configuration.RABBITMQ_EXCHANGE,
	queue: queueName,
	routingKey: 'user.created',
	prefetch: 1
}, async (msg) => {
	console.log(msg.data);
});

export default listenLogs;
