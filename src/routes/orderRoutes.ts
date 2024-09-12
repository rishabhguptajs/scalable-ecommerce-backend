import express from 'express'
import { validate } from '../utils/validationUtils';
import { createOrder, deleteOrderController, getUserOrders, getUserOrdersById, updateStatus } from '../controllers/orderController';
import { isAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', validate, createOrder);
router.get('/', validate, getUserOrders);
router.get('/:orderId', validate, getUserOrdersById);
router.put('/:orderId', validate, isAdmin, updateStatus);
router.delete('/', validate, deleteOrderController);

export default router;