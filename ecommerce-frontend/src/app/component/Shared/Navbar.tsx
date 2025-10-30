"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Search, LogIn } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setCredentials } from "@/features/auth/authSlice";
import { RootState } from "@/app/store";
import { useGetCartQuery } from "@/features/cart/cartApiSlice";
import { CartItem } from "@/lib/types";
// A simple placeholder type for our user state
interface User {
  name: string;
}
interface DecodedToken {
  userId: number;
  email: string;
  name: string; // Assuming you added 'name' to the token payload
  iat: number;
  exp: number;
}

export default function Navbar() {
  const dispatch = useDispatch();
  // Read the user directly from the global Redux state
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: cartItems = [] } = useGetCartQuery();
    // 1. Add a state to track if we have checked for the token yet
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL search params to persist search terms on refresh
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
const cartCount = cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);


  // Debounce the search term to avoid firing searches on every keystroke
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

   useEffect(() => {
    // This effect now just determines the status, it doesn't set the user directly.
    // The Redux store and initializer are the source of truth for user data.
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthStatus('authenticated');
    } else {
      setAuthStatus('unauthenticated');
    }
  }, [user]); // Re-run this effect if the global user state changes

useEffect(() => {
  const token = localStorage.getItem("authToken");
  if (token && !user) {
    try {
      const decoded = jwtDecode<{ name: string; email: string; exp: number }>(token);
       console.log("test Decoded token:", decoded);
      if (decoded.exp * 1000 > Date.now()) {
        dispatch(setCredentials({ 
          user: { name: decoded.name, email: decoded.email }, 
          token 
        }));
      } else {
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error("Token decode failed:", error);
      localStorage.removeItem("authToken");
    }
  }
}, [dispatch, user]);


const getInitials = (name?: string) => {
  console.log(name,"test name")
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("authToken");
    toast.success("You have been logged out.");
  };

const handleSearchSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const params = new URLSearchParams();

  if (searchTerm && searchTerm.trim() !== "") {
    // If search term exists, set query param
    params.set("query", searchTerm.trim());
  }
  // If searchTerm is empty, we do NOT set "query" → products page will show all products

  router.push(`/products?${params.toString()}`);
};
  // Use a ref to track the initial render
  // const isInitialRender = useRef(true);
  // useEffect(() => {
  //   // If it's the first time the component renders, do nothing.

  //   if (isInitialRender.current) {
  //     isInitialRender.current = false;
  //     return;
  //   }

  //   const params = new URLSearchParams(searchParams);
  //   if (debouncedSearchTerm) {
  //     params.set("query", debouncedSearchTerm);
  //   } else {
  //     params.delete("query");
  //   }

  //   // Always navigate to the products page to show search results
  //   router.push(`/products?${params.toString()}`);
  // }, [debouncedSearchTerm, router, searchParams]); // Removed pathname
 const renderAuthSection = () => {
    // 2. Render content based on the auth status
    if (authStatus === 'loading') {
      return <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />; // Placeholder
    }

    if (authStatus === 'authenticated' && user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
            <AvatarImage src="" alt={user?.name || "User"} />
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
           <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem
                onSelect={handleLogout}
                className="text-red-500"
              >
                Logout
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link href="/login">
            <Button variant="ghost">
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </Button>
          </Link>
    );
  };
  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        E-Shop
      </Link>

      <div className="flex items-center w-full max-w-md bg-gray-100 rounded-lg overflow-hidden border focus-within:ring-2 focus-within:ring-blue-500">
        <div className="pl-3 pr-2 text-gray-500">
          <Search className="w-5 h-5" />
        </div>
        <form onSubmit={handleSearchSubmit} >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-2 py-2 bg-gray-100 focus:outline-none"
        />
        </form>
      </div>
      <div className="flex items-center gap-4 ">
        <Link
          href="/cart"
          className="relative"
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
          }}
        >
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      {renderAuthSection()}
      </div>
    </nav>
  );
}
