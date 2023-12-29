/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable('counters', function(table) {
    table.uuid('uuid').notNullable().primary();
    table.string('no_generate', 50).notNullable();
    table.integer('count').notNullable();
    table.timestamp('createdAt');
    table.timestamp('updatedAt');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTableIfExists('counters');
};
