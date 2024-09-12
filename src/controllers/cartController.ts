import { Request, Response } from "express"
import mongoose from "mongoose"
import * as cartService from "../services/cartService"

export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body
    const userId = req.params.userId

    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ error: "Invalid userId or productId" })
    }

    const cart = await cartService.addItemToCart(userId, productId, quantity)
    res.status(200).json(cart)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const getCartItems = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" })
    }

    const cartItems = await cartService.getCartItems(
      new mongoose.Types.ObjectId(userId)
    )
    res.status(200).json(cartItems)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body
    const userId = req.params.userId

    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ error: "Invalid userId or productId" })
    }

    const cart = await cartService.updateCartItem(
      new mongoose.Types.ObjectId(userId),
      new mongoose.Types.ObjectId(productId),
      quantity
    )
    res.status(200).json(cart)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body
    const userId = req.params.userId

    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ error: "Invalid userId or productId" })
    }

    const cart = await cartService.deleteCartItem(
      new mongoose.Types.ObjectId(userId),
      new mongoose.Types.ObjectId(productId)
    )
    res.status(200).json(cart)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
