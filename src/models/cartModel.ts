import mongoose, { Schema, Types } from 'mongoose';
import { ICart } from '../interfaces/cartInterface';

const CartSchema: Schema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

export default mongoose.model<ICart>('Cart', CartSchema);
