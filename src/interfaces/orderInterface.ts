import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    items:[
        {
            product: mongoose.Types.ObjectId;
            quantity: number;
            price: number;
        }
    ],
    totalAmount: number;
    status: string;
}