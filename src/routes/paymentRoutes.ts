import { Router } from 'express';
import {
    createProduct,
    initiatePayment,
    confirmPaymentIntent,
    cancelPaymentIntent,
    createCheckout
} from '../controllers/paymentController';

const router = Router();

router.post('/create-product', createProduct);

router.post('/payment-intent', initiatePayment);

router.post('/confirm-payment', confirmPaymentIntent);

router.post('/cancel-payment', cancelPaymentIntent);

router.post('/checkout-session', createCheckout);

export default router;