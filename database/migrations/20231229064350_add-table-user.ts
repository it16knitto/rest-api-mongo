import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('users', function (table) {
			table.string('uuid', 36).primary();
			table.string('kode', 5).notNullable();
			table.string('nama', 50).notNullable();
			table.string('username', 30).unique();
			table.string('password', 255).notNullable();
			table.dateTime('createdAt').nullable();
			table.dateTime('updatedAt').nullable();
		})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.dropTable('users');
}

