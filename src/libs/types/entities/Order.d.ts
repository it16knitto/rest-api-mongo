declare namespace Entity{
	interface Order {
		uuid?: string
		no_order?: string
		tanggal: Date
		user_uuid: string
		total: number
		createdAt?: Date
		updatedAt?: Date
	}
}
