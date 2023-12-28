import { Exception, ExpressType, TRequestFunction } from '@knittotextile/knitto-core-backend';
import { connectionMysql } from '../../../../config/dbConnection';
import { ProductEntity } from '../../../../entity/Product.entity';
import { ProductDto } from './Product.dto';
import ProductRepository from '../../../../repositories/Product.repository';

const getProduct: TRequestFunction = async (req: ExpressType.Request) => {
	const page = Number(req.query.page) || 1;
	const perPage = Number(req.query.perPage) || 10;

	const productRepo = new ProductRepository(connectionMysql);
	const products = await productRepo.getAll({ page, perPage });
	return { result: products };
};

const getOneProduct: TRequestFunction = async (req: ExpressType.Request) => {
	const uuid = req.params.uuid;
	const product = await connectionMysql.raw<ProductEntity[]>('SELECT * FROM products where uuid = ?', [uuid])
		.then(result => result[0]);
	return { result: product };
};

const createProduct: TRequestFunction = async (req: ExpressType.Request) => {
	const productDto = req.body as ProductDto;
	const productRepo = new ProductRepository(connectionMysql);

	const createProduct = await productRepo.insert(productDto);

	return { result: createProduct };
};

const updateProduct: TRequestFunction = async (req: ExpressType.Request) => {
	const paramUuid = req.params.uuid;

	const checkProduct = await connectionMysql.raw<ProductEntity[]>('SELECT * FROM products WHERE uuid = ? ', [paramUuid])
		.then(products => products[0]);

	if (!checkProduct) throw new Exception.NotFoundException('Product not found');

	const productDto = req.body as ProductDto;
	const productRepo = new ProductRepository(connectionMysql);

	const updateProduct = await productRepo.update({
		nama: productDto.nama,
		deskripsi: productDto.deskripsi,
		harga: productDto.harga,
		kode: productDto.kode
	}, {
		uuid: paramUuid
	}).catch((err) => {
		throw new Exception.InvalidParameterException(String(err));
	});

	return { result: updateProduct };
};

const deleteProduct: TRequestFunction = async (req: ExpressType.Request) => {
	const paramUuid = req.params.uuid;

	const checkProduct = await connectionMysql.raw<ProductEntity[]>('SELECT * FROM products WHERE uuid = ? ', [paramUuid])
		.then(products => products[0]);

	if (!checkProduct) throw new Exception.NotFoundException('Product not found');

	const productRepo = new ProductRepository(connectionMysql);

	const deleteProduct = await productRepo.remove({ uuid: paramUuid });

	return { result: deleteProduct };
};

export { getProduct, getOneProduct, createProduct, updateProduct, deleteProduct };
