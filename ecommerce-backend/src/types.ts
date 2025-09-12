// src/types.ts
export interface User {
  id: number; // <-- Make sure this is lowercase 'number'
  email: string;
  name: string;
  password?: string;
  password_hash?: string;
  is_verified?: boolean;
  created_at?: string;
}