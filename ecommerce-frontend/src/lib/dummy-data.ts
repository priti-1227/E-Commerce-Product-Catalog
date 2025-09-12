// src/lib/dummy-data.ts
import { CartItem, Product } from "./types";

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-fidelity audio with noise-cancellation.",
    price: 2499.00,
    stock_quantity: 50,
    image_url: "/images/headphones.jpg",
    category_name: "Electronics",
  },
  {
    id: 2,
    name: "Classic Cotton T-Shirt",
    description: "100% premium cotton, available in multiple colors.",
    price: 899.00,
    stock_quantity: 120,
    image_url: "/images/tshirt.jpg",
    category_name: "Clothing",
  },
  {
    id: 3,
    name: "The Art of Programming",
    description: "A deep dive into modern software architecture.",
    price: 1250.00,
    stock_quantity: 75,
    image_url: "/images/book.jpg",
    category_name: "Books",
  },
  {
    id: 4,
    name: "Modern Ceramic Plant Pot",
    description: "A stylish pot for your indoor plants. 8-inch diameter.",
    price: 750.00,
    stock_quantity: 90,
    image_url: "/images/plant-pot.jpg",
    category_name: "Home & Garden",
  }
];


export const DUMMY_CART_ITEMS: CartItem[] = [
  {
    ...DUMMY_PRODUCTS[0], // Wireless Bluetooth Headphones
    quantity: 1,
  },
  {
    ...DUMMY_PRODUCTS[2], // The Art of Programming
    quantity: 2,
  },
];