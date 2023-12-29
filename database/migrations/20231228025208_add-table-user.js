/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
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
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTable('users');
};
