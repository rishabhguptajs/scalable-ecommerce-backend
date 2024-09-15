import { IOrder } from './../interfaces/orderInterface';
import Order from '../models/orderModel';
import { Request, Response } from 'express';
import mongoose, { mongo } from 'mongoose';
import { addOrder, deleteOrder, getOrderById, getOrders, updateOrderStatus } from '../services/orderService';
import { createCheckoutSession } from '../services/paymentService';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { user: userId, items, totalAmount } = req.body as IOrder;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId" });
        }

        const order = await addOrder({
            user: userId,
            items,
            totalAmount,
            status: "pending",
        });

        const CHECKOUT_SESSION_ID = order._id;

        const successUrl = `${process.env.FRONTEND_URL}/payment-success?session_id=${CHECKOUT_SESSION_ID}`; 
        const cancelUrl = `${process.env.FRONTEND_URL}/payment-cancel`;

        const session = await createCheckoutSession(totalAmount, 'usd', successUrl, cancelUrl);

        res.status(200).json({
            order,
            checkoutUrl: session.url,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserOrders = async(req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({ error: "Invalid userId" });
        }

        const orders = await getOrders(userId);

        res.status(200).json(orders);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
}

export const getUserOrdersById = async(req: Request, res: Response) => {
    try {
        const { orderId } = req.params;

        if(!mongoose.Types.ObjectId.isValid(orderId)){
            return res.status(400).json({ error: "Invalid orderId" });
        }

        const order = await getOrderById(orderId);

        res.status(200).json(order);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
}

export const updateStatus = async(req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        if(!mongoose.Types.ObjectId.isValid(orderId)){
            return res.status(400).json({ error: "Invalid orderId" });
        }

        const updatedOrder = await updateOrderStatus(orderId, status);

        res.status(201).json(updatedOrder);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
}

export const deleteOrderController = async(req: Request, res: Response) => {
    try {
        const { orderId } = req.params;

        if(!mongoose.Types.ObjectId.isValid(orderId)){
            return res.status(400).json({ error: "Invalid orderId" });
        }

        const response = await deleteOrder(orderId);

        res.status(201).json(response);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
}