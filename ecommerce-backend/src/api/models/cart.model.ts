import pool from "../../config/database.js";


export const addItemToCart = async (userId: number, productId: number, quantity: number) => {
  // This "UPSERT" query tries to INSERT a new row.
  // If it fails because the (user_id, product_id) pair already exists
  // (due to our UNIQUE constraint), it will UPDATE the quantity instead.
  const query = `
    INSERT INTO cart_items (user_id, product_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET quantity = cart_items.quantity + $3
    RETURNING *;
  `;
  
  const values = [userId, productId, quantity];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getCartItemByUserId = async(UserId:number)=>{
  const query = ` SELECT
      ci.id AS cart_item_id,
      ci.quantity,
      p.id AS product_id,
      p.name,
      p.price,
      p.image_url
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = $1 -- <-- THE FIX IS HERE
    ORDER BY ci.created_at;`;
const result = await pool.query(query, [UserId]);
  return result.rows;

}

export const updateItemQuantity = async(userId: number, cartItemId: number, quantity: number)=>{
  const query = `UPDATE CART_ITEMS SET QUANTITY = $1 WHERE ID = $2 AND USER_ID =$3 RETURNING *;`
  const values = [quantity, cartItemId, userId]
  const result = await pool.query(query,values);
   
  return result.rows[0]
}

export const deleteCartItem = async(userId: number, cartItemId: number)=>{
  const query = `DELETE FROM CART_ITEMS WHERE ID = $1 AND USER_ID = $2 RETURNING * ;`
  const values = [cartItemId, userId];

  // Pass the 'values' array as the second argument
  const result = await pool.query(query, values);
   return result.rows[0];
}
