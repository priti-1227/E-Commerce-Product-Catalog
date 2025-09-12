import type { Request, Response } from 'express';
import * as categoryModel from '../models/category.model.js'
export const getCategories = async (req: Request, res: Response)=>{
try{
    const categories = await categoryModel.getAllCategories();
    res.status(200).json(categories);
}catch(error){
res.status(500).json({ message: 'Error fetching categories', error })
}

};