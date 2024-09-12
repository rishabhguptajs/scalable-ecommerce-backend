import Order from "../models/orderModel";
import { IOrder } from "../interfaces/orderInterface";
import mongoose from "mongoose";

interface addOrderParams {
    user: mongoose.Types.ObjectId,
    items: [
        {
            product: mongoose.Types.ObjectId,
            quantity: number,
            price: number
        }
    ],
    totalAmount: number,
    status: string
}

export const addOrder = async({ user, items, totalAmount, status }: addOrderParams) => {
    try {
        const newOrder = new Order({
            user,
            items,
            totalAmount,
            status
        });

        await newOrder.save();

        return newOrder;
    } catch (error: any) {
        throw new Error(`Error while adding order: ${error.message}`);
    }
}

export const getOrders = async(userId: string) => {
    try {
        const orders = await Order.find({ user: userId });

        return orders;
    } catch (error: any) {
        throw new Error(`Error while fetching orders: ${error.message}`);
    }
}

export const getOrderById = async(orderId: string) => {
    try {
        const order = await Order.findById(orderId);

        return order;
    } catch (error: any) {
        throw new Error(`Error while fetching order: ${error.message}`);
    }
}

export const updateOrderStatus = async(orderId: string, status: string) => {
    try {
        const order = await Order.findById(orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        order.status = status;

        await order.save();

        return order;
    } catch (error: any) {
        throw new Error(`Error while updating order status: ${error.message}`);
    }
}

export const deleteOrder = async(orderId: string) => {
    try {
        const order = await Order.findById(orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        await order.remove();

        return { message: "Order deleted successfully!" };
    } catch (error: any) {
        throw new Error(`Error while deleting order: ${error.message}`);
    }
}