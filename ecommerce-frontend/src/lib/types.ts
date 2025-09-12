export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number; // Matches the database schema
  image_url: string | null; // The correct property for the image
  category_name: string;    // The descriptive category name
  createdAt?: string;
  updatedAt?: string;
};

export type CartItem = Product & { quantity: number };