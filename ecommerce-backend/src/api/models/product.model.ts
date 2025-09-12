// src/api/models/product.model.ts

import pool from "../../config/database.js";


// The function now accepts an optional 'searchTerm'
export const getAllProducts = async (searchTerm?: string,category?:string , sort?:string) => {
  let query = `
    SELECT
      p.id, p.name, p.description, p.price, p.stock_quantity,
      p.image_url, c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
  `;
  const queryParams = [];
  let whereClauses = [];

  // If a search term is provided, add a WHERE clause
  if (searchTerm) {
    queryParams.push(`%${searchTerm}%`);
    whereClauses.push(`p.name ILIKE $${queryParams.length}`);
  }
  if (category) {
    queryParams.push(category);
    whereClauses.push(`c.name = $${queryParams.length}`);
  }
  
  if (whereClauses.length > 0) {
    query += ` WHERE ${whereClauses.join(' AND ')}`;
  }

  // Handle sorting
  let orderBy = 'p.created_at DESC'; // Default sort
  if (sort) {
    const [sortField, sortOrder] = sort.split('_');
    // Whitelist sortable columns to prevent SQL injection
    if (['price', 'name'].includes(sortField) && ['asc', 'desc'].includes(sortOrder)) {
      orderBy = `p.${sortField} ${sortOrder.toUpperCase()}`;
    }
  }
  query += ` ORDER BY ${orderBy};`;


  const result = await pool.query(query, queryParams);
  return result.rows;
};

export const getProductById = async(id: number) => {
let query = `SELECT P.ID ,P.NAME , P.DESCRIPTION , P.PRICE , P.stock_quantity ,p.image_url, c.name AS category_name
    FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE P.ID = $1;`;
     
    const result = await pool.query(query,[id]);
   return result.rows[0];
}


