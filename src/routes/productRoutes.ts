import express from 'express'
import { validate } from '../utils/validationUtils';
import { isAdmin } from '../middlewares/authMiddleware';
import { createProduct, deleteProduct, getProductById, getProducts, updateProductPriceController } from '../controllers/productController';
import { updateProduct } from '../services/productService';

const router = express.Router();

router.post('/', validate, isAdmin, createProduct);
router.get('/', validate, getProducts);
router.get('/:productId', validate, getProductById);
router.put('/:productId', validate, isAdmin, updateProduct);
router.delete('/:productId', validate, isAdmin, deleteProduct);
router.put('/:productId', validate, isAdmin, updateProductPriceController);

export default router;