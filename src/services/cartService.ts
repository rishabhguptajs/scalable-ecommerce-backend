import Cart from "../models/cartModel";
import Product from "../models/productModel";
import { ICart, ICartItem } from "../interfaces/cartInterface";
import { IProduct } from "../interfaces/productInterface";
import mongoose from "mongoose";

export const addItemToCart = async (userId: string, productId: mongoose.Types.ObjectId, quantity: number) => {
  try {
    const product = await Product.findById(productId) as IProduct;

    if (!product) {
      throw new Error("Product not found");
    }

    let cart: ICart = await Cart.findOne({ userId }) as ICart;

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ productId, quantity, price: product.price }],
      });
    } else {
      const existingItemIndex = cart.items.findIndex((item: ICartItem) => item.productId === productId);

      if (existingItemIndex >= 0) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        const newItem: ICartItem = {
          productId,
          quantity,
          price: product.price,
        };
        cart.items.push(newItem);
      }
    }

    await cart.save();
    return cart;
  } catch (error: any) {    
    throw new Error(`Failed to add item to cart: ${error.message}`);
  }
};

export const getCartItems = async(userId: mongoose.Types.ObjectId) => {
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId') as ICart;

        if (!cart) {
            throw new Error("Cart not found");
        }

        return cart.items;
    } catch (error: any) {
        throw new Error(`Failed to get cart items: ${error.message}`);
    }
}

export const updateCartItem = async(userId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId, quantity: number) => {
    try {
        const cart = await Cart.findOne({ userId }) as ICart;

        if (!cart) {
            throw new Error("Cart not found");
        }

        const existingItemIndex = cart.items.findIndex((item: ICartItem) => item.productId === productId);

        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity = quantity;
        } else {
            throw new Error("Item not found in cart");
        }

        await cart.save();

        return cart;
    } catch (error: any) {
        throw new Error(`Failed to update cart item: ${error.message}`);
    }
}

export const deleteCartItem = async(userId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId) => {
    try {
        const cart = await Cart.findOne({ userId }) as ICart;

        if (!cart) {
            throw new Error("Cart not found");
        }

        const existingItemIndex = cart.items.findIndex((item: ICartItem) => item.productId === productId);

        if (existingItemIndex >= 0) {
            cart.items.splice(existingItemIndex, 1);
        } else {
            throw new Error("Item not found in cart");
        }

        await cart.save();

        return cart;
    } catch (error: any) {
        throw new Error(`Failed to delete cart item: ${error.message}`);
    }
}