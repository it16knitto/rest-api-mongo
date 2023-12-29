import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('logs', function (table) {
			table.uuid('uuid').notNullable().primary();
			table.text('keterangan').notNullable();
			table.timestamp('createdAt');
			table.timestamp('updatedAt');
		})
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('logs');
}

