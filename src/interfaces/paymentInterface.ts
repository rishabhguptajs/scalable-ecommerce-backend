import { Document } from "mongoose";

export interface IPayment extends Document {
    productName: string;
    productDescription: string;
    stripeProductId: string;
    stripePriceId: string;
    amount: number;
    currency: string;
    paymentIntentId: string;
    paymentStatus: string;
    customerEmail: string;
}