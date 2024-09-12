import { IProduct } from './../interfaces/productInterface';
import Product from '../models/productModel';
import { clearCache, getCache, setCache } from './cacheService';

export const createProduct = async (productData: { name: string, price: number, description: string, category: string, stock:number }): Promise<IProduct> => {
    const { name, price, description, category, stock } = productData;

    const product = new Product({
        name,
        price,
        description,
        category,
        stock
    });

    return await product.save();
};

export const getProductById = async (productId: string): Promise<IProduct | null> => {
    const cachedProduct = await getCache(`product:${productId}`);
    if (cachedProduct) {
        return cachedProduct;
    }

    const product = await Product.findById(productId);

    if (product) {
        await setCache(`product:${productId}`, product, 3600);
    }

    return product;
};

export const updateProduct = async (productId: string, updateData: Partial<IProduct>): Promise<IProduct | null> => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (updatedProduct) {
        clearCache(`product:${productId}`);
    }

    return updatedProduct;
};

export const deleteProduct = async (productId: string): Promise<IProduct | null> => {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
        clearCache(`product:${productId}`);
    }

    return deletedProduct;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
    const cachedProducts = await getCache(`products:all`);
    if (cachedProducts) {
        return cachedProducts;
    }

    const products = await Product.find();
    await setCache(`products:all`, products, 3600);

    return products;
};

export const updateProductPrice = async (productId: string, newPrice: number): Promise<IProduct | null> => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, { price: newPrice }, { new: true });

    if (updatedProduct) {
        clearCache(`product:${productId}`);
    }

    return updatedProduct;
};

export const searchProduct = async(query: string) => {
    const products = await Product.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ]
    });

    return products;
}