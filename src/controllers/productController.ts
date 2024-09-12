import { Request, Response } from "express";
import * as productService from '../services/productService';

export const createProduct = async(req: Request, res: Response) => {
    try {
        const { name, price, description, category, stock } = req.body;
        const product = await productService.createProduct({ name, price, description, category, stock });

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const product = await productService.getProductById(productId);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const updatedProduct = await productService.updateProduct(productId, req.body);

        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const result = await productService.deleteProduct(productId);

        if (result) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const updateProductPriceController = async(req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const { price } = req.body;

        if (price === undefined || typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: "Invalid price value." });
        }

        const updatedProduct = await productService.updateProductPrice(productId, price);

        if (updatedProduct) {
            res.status(200).json({
                message: "Product price updated successfully",
                product: updatedProduct
            });
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export const searchProductController = async(req: Request, res: Response) => {
    try {
        const { query } = req.params;
        const products = await productService.searchProduct(query);

        if (products.length) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ error: "No products found" });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}