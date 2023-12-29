export interface OrderDetailEntity {
	uuid?: string
	order_uuid?: string
	product_uuid: string
	user_uuid: string
	qty: number
	harga: number
	nilai: number
	createdAt?: Date
	updatedAt?: Date
}
