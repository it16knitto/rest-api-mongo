import { MongoClient, ServerApiVersion } from 'mongodb';
const uri =
	'mongodb+srv://it16knitto:AfaFyPfcDQKA5MKu@cluster1.xl4v9.mongodb.net/?retryWrites=true&w=majority&appName=cluster1';
export const mongoDBClient = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: false,
		deprecationErrors: false
	}
});

export const mongoDB = mongoDBClient.db('test');
