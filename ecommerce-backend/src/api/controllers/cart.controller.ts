import type { Request, Response } from 'express';
import * as cartModel from '../models/cart.model.js';

// Extend Request type to include our user property
interface AuthRequest extends Request {
  user?: { userId: number };
}

export const addItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    // THE FIX: Get the real userId from the request object
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'productId and quantity are required.' });
    }

    const cartItem = await cartModel.addItemToCart(userId, productId, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    // THE FIX: Get the real userId from the request object
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const cartItems = await cartModel.getCartItemByUserId(userId);
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};


export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const cartItemId = parseInt(req.params.itemId);
    const { quantity } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    if (quantity === undefined) {
      return res.status(400).json({ message: 'Quantity is required.' });
    }

    let result;
    if (quantity > 0) {
      result = await cartModel.updateItemQuantity(userId, cartItemId, quantity);
    } else {
      // If quantity is 0, delete the item from the cart
      result = await cartModel.deleteCartItem(userId, cartItemId);
    }
    
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: 'Cart item not found or not owned by user.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error });
  }
};
export const deleteItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const cartItemId = parseInt(req.params.itemId);

    if (!userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const deletedItem = await cartModel.deleteCartItem(userId, cartItemId);

    if (deletedItem) {
      res.status(200).json({ message: 'Item removed from cart successfully', item: deletedItem });
    } else {
      res.status(404).json({ message: 'Cart item not found or not owned by user.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};