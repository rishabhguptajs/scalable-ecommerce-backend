import { Document } from "mongoose";

export interface IProduct extends Document{
    name: string,
    price: number,
    description: string,
    category: string,
    stock: number
}