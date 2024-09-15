import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/userInterface";

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    }
})

const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;