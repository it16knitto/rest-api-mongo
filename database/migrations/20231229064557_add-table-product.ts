import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.raw(`CREATE TABLE products (uuid char(36) NOT NULL,
	kode varchar(100) NOT NULL,
	nama varchar(100) NOT NULL,
	deskripsi text NOT NULL,
	harga float(2) NOT NULL,
	createdAt timestamp NULL,
	updatedAt timestamp NULL,
	UNIQUE INDEX UQ_fe0bb3f6520ee1234504521e710 (kode),
	PRIMARY KEY (uuid)) ENGINE = InnoDB`)
}


export async function down(knex: Knex): Promise<void> {
	return knex.raw('DROP TABLE products')
}

