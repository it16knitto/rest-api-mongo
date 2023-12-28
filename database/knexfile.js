const dotenv = require('dotenv').config({path:'./../.env'})
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

	development: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST_MYSQL,
			port: process.env.DB_PORT_MYSQL,
			user: process.env.DB_USER_MYSQL,
			password: process.env.DB_PASS_MYSQL,
			database: process.env.DB_NAME_MYSQL,
		},
		migrations: {
			tableName: 'migrations',
		},
	},

	staging: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST_MYSQL,
			port: process.env.DB_PORT_MYSQL,
			user: process.env.DB_USER_MYSQL,
			password: process.env.DB_PASS_MYSQL,
			database: process.env.DB_NAME_MYSQL,
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'migrations'
		}
	},

	production: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST_MYSQL,
			port: process.env.DB_PORT_MYSQL,
			user: process.env.DB_USER_MYSQL,
			password: process.env.DB_PASS_MYSQL,
			database: process.env.DB_NAME_MYSQL,
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'migrations'
		}
	}

};
