import type { Request, Response } from 'express';
import * as authModel from '../models/auth.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // 1. Find the user by email
    const user = await authModel.findUserByEmail(email);
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' }); // Use a generic message
    }

    // 2. Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // --- (We'll add the is_verified check here later) ---

    // 3. Generate a JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // This is the data stored in the token (payload)
      process.env.JWT_SECRET || 'your_default_secret', // The secret key from your .env file
      { expiresIn: '1h' } // Token expiration time
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });

  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
