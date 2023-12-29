import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('counters', function (table) {
		table.uuid('uuid').notNullable().primary();
		table.string('no_generate', 50).notNullable();
		table.integer('count').notNullable();
		table.timestamp('createdAt');
		table.timestamp('updatedAt');
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('counters');
}

