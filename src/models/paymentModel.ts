import mongoose, { Schema } from "mongoose";


const PaymentSchema: Schema = new Schema({
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    stripeProductId: { type: String, required: true },
    stripePriceId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentIntentId: { type: String, required: true },
    paymentStatus: { type: String, enum: ['pending', 'succeeded', 'failed', 'canceled'], default: 'pending' },
    customerEmail: { type: String, required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;