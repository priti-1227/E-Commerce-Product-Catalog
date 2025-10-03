import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import pool from './config/database.js';
import productRoutes from './api/routes/product.routes.js';
import cors from 'cors';
import categoryRoutes from './api/routes/category.route.js'; 
// --- SWAGGER IMPORTS ---
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerDefinition from './config/swagger.js';
import authRoutes from './api/routes/auth.routes.js'
import cartRoutes from './api/routes/cart.routes.js';
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
// --- USE CORS MIDDLEWARE ---
// This allows your frontend at localhost:3000 to make requests to this server.
app.use(cors({
  origin: 'http://localhost:3000' 
}));

// --- SWAGGER CONFIGURATION ---
const swaggerOptions = {
  swaggerDefinition, // Use the imported definition
  apis: ['./dist/api/routes/*.js'], // Still point to your compiled route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// A simple test route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});




// This tells our app: "For any request that starts with '/api/products',
app.use('/api/auth', authRoutes);
// let the 'productRoutes' router handle it."
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);







app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Optional: you can add a simple query to confirm the connection is active
  pool.query('SELECT NOW()', (err:any, res:any) => {
    if (err) {
      console.error('Database connection test failed:', err);
    } else {
      console.log('Database connection test successful. Current time:', res.rows[0].now);
    }
  });
});