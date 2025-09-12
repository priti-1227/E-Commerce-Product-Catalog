import bcrypt from 'bcrypt';
import { User } from "../../types.js";
import pool from '../../config/database.js';


export const createUser = async(user: Omit<User, 'id'>) => {
     const { email, name, password } = user;
      if (!password) {
    throw new Error('Password is required to create a user.');
  }

     const saltRounds = 10 ;
     const passwordHash = await bcrypt.hash(password, saltRounds);
     const query = `INSERT INTO users(email, name ,password_hash) VALUES ($1 , $2 , $3) RETURNING id, email, name, created_at;`
     const values = [email , name , password ]

     const result = await pool.query(query)
      return result.rows[0];
}