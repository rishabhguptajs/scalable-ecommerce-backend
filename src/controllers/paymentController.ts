import { Request, Response } from 'express';
import {
    createProductStripe,
    createPaymentIntent,
    confirmPayment,
    cancelPayment,
    createCheckoutSession
} from '../services/paymentService';

const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;
        const response = await createProductStripe(name, description, price);
        res.status(201).json(response);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const initiatePayment = async (req: Request, res: Response) => {
    try {
        const { amount, currency } = req.body;
        const paymentIntent = await createPaymentIntent(amount, currency);
        res.status(200).json(paymentIntent);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const confirmPaymentIntent = async (req: Request, res: Response) => {
    try {
        const { paymentIntentId } = req.body;
        const paymentIntent = await confirmPayment(paymentIntentId);
        res.status(200).json(paymentIntent);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const cancelPaymentIntent = async (req: Request, res: Response) => {
    try {
        const { paymentIntentId } = req.body;
        const paymentIntent = await cancelPayment(paymentIntentId);
        res.status(200).json(paymentIntent);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

const createCheckout = async (req: Request, res: Response) => {
    try {
        const { amount, currency, successUrl, cancelUrl } = req.body;
        const session = await createCheckoutSession(amount, currency, successUrl, cancelUrl);
        res.status(200).json(session);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export {
    createProduct,
    initiatePayment,
    confirmPaymentIntent,
    cancelPaymentIntent,
    createCheckout
};
