import type { Request, Response } from 'express';
import * as productModel from '../models/product.model.js';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.query as string | undefined;
    const category = req.query.category as string | undefined; // Reads 'category' from URL
    const sort = req.query.sort as string | undefined;
    
    // Passes 'category' to the model function
    const products = await productModel.getAllProducts(searchTerm, category, sort);
    
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProductById = async (req:Request , res:Response)=>{
  try{
    const id = parseInt(req.params.id)
    const product = await productModel.getProductById(id);
    res.status(200).json(product);
  }catch(error){
    res.status(500).json({ message: 'Error fetching products', error })
  }
}