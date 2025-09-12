import type { Request, Response } from 'express';
import * as authModel from '../models/auth.model.js'
export const register = async(req:Request , res:Response) => {
    try{
        const {email , name , password } = req.body;
        if(!email || !name || !password){
            return res.status(400).json({message:'Email, name, and password are required.'})
        }
        const newUser = await authModel.createUser({email , name , password });
        res.status(201).json(newUser);

    }catch(error:any){
        if (error.code === '23505') { // PostgreSQL unique violation error code
        return res.status(409).json({ message: 'Email already in use.' });
    }
    res.status(500).json({ message: 'Error registering user', error });
  }

    
}
