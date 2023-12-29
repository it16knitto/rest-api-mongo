import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema
	.createTable('orders', function (table) {
		table.uuid('uuid').notNullable().primary();
		table.string('no_order', 50);
		table.timestamp('tanggal').notNullable();
		table.uuid('user_uuid').notNullable();
		table.double('total').notNullable();
		table.timestamp('createdAt');
		table.timestamp('updatedAt');
	})
	.createTable('order_details', function (table) {
		table.uuid('uuid').notNullable().primary();
		table.uuid('order_uuid').notNullable();
		table.uuid('product_uuid').notNullable();
		table.uuid('user_uuid').notNullable();
		table.double('qty').notNullable();
		table.double('harga').notNullable();
		table.double('nilai').notNullable();
		table.timestamp('createdAt');
		table.timestamp('updatedAt');
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema
	.dropTable("orders")
	.dropTable("order_details");
}


//? The same config property can be used for enabling transaction per-migration
//? in case the common configuration has disableTransactions: true
// exports.config = { transaction: true };

