/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable('logs', function (table) {
			table.uuid('uuid').notNullable().primary();
			table.text('keterangan').notNullable();
			table.timestamp('createdAt');
			table.timestamp('deletedAt');
		})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists('logs');
};
