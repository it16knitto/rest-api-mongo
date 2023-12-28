/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable('orders', function (table) {
			table.uuid('uuid').notNullable().primary();
			table.string('no_order', 50);
			table.timestamp('tanggal').notNullable();
			table.uuid('user_uuid').notNullable();
			table.float('total', 2).notNullable();
			table.timestamp('createdAt');
			table.timestamp('deletedAt');
		})
		.createTable('order_details', function (table) {
			table.uuid('uuid').notNullable().primary();
			table.uuid('order_uuid').notNullable();
			table.uuid('product_uuid').notNullable();
			table.uuid('user_uuid').notNullable();
			table.float('qty', 2).notNullable();
			table.float('harga', 2).notNullable();
			table.float('nilai', 2).notNullable();
			table.timestamp('createdAt');
			table.timestamp('deletedAt');
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTable("orders")
		.dropTable("order_details");
};

//? The same config property can be used for enabling transaction per-migration
//? in case the common configuration has disableTransactions: true
exports.config = { transaction: true };
