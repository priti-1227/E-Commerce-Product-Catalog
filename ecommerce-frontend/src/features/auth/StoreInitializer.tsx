"use client";

import { useRef } from 'react';
import { useStore } from 'react-redux';
import { setCredentials } from './authSlice';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  name: string;
  email: string;
  exp: number;
}

function StoreInitializer() {
  const store = useStore();
  const isInitialized = useRef(false);

  if (!isInitialized.current) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    if (token) {
      try {
        const decodedUser = jwtDecode<DecodedToken>(token);
        
        // Check if token is expired
        if (decodedUser.exp * 1000 > Date.now()) {
          store.dispatch(setCredentials({ user: { name: decodedUser.name, email: decodedUser.email }, token }));
        } else {
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error("Failed to decode token on initial load", error);
        localStorage.removeItem('authToken');
      }
    }
    isInitialized.current = true;
  }

  return null; // This component renders nothing
}

export default StoreInitializer;