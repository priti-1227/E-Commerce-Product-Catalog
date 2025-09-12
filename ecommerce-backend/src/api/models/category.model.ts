import pool from "../../config/database.js";

export const getAllCategories = async() => {
   const query = 'SELECT NAME FROM CATEGORIES ORDER BY NAME ASC;';
    const result = await pool.query(query)
     return result.rows;
}