import express from 'express'
import { addItemToCart, getCartItems, updateCartItem } from '../controllers/cartController';

const router = express.Router();

router.post('/', addItemToCart);
router.get('/:userId', getCartItems);
router.put('/:userId', updateCartItem);
router.delete('/:userId', updateCartItem);

export default router;