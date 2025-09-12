import pool from "../config/database.js";


interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: string;
}

async function seedDatabase() {
  console.log('Fetching products from dummyjson.com...');
  const response = await fetch('https://dummyjson.com/products?limit=20');
  const data = await response.json();
  const products: DummyProduct[] = data.products;

  if (!products) {
    console.error('Failed to fetch products.');
    return;
  }
  
  console.log(`Fetched ${products.length} products. Seeding database...`);

  // We need to make sure the categories exist before inserting products
  const categoryNames = [...new Set(products.map(p => p.category))];
  for (const name of categoryNames) {
    await pool.query('INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;', [name]);
  }
  console.log('Categories seeded successfully.');

  // Now, insert the products
  for (const product of products) {
    const categoryResult = await pool.query('SELECT id FROM categories WHERE name = $1;', [product.category]);
    const categoryId = categoryResult.rows[0]?.id;

    if (categoryId) {
      const productQuery = `
        INSERT INTO products (name, description, price, stock_quantity, category_id, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT DO NOTHING;
      `;
      const productValues = [
        product.title,
        product.description,
        product.price,
        product.stock,
        categoryId,
        product.thumbnail
      ];
      await pool.query(productQuery, productValues);
    }
  }

  console.log('✅ Database seeded successfully!');
  await pool.end(); // Close the connection pool
}

seedDatabase().catch(error => {
  console.error('Error seeding database:', error);
  process.exit(1);
});