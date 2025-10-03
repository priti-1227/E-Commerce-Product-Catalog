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
import { logOut } from "@/features/auth/authSlice";
import { RootState } from "@/app/store";
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
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL search params to persist search terms on refresh
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [cartCount, setCartCount] = useState(0); // This would come from a global state/context later
  // const [users, setUser] = useState<User | null>(null);

  // Debounce the search term to avoid firing searches on every keystroke
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     try {
  //       // Decode the token
  //       const decodedToken = jwtDecode<DecodedToken>(token);

  //       // Check if the token is expired
  //       const isExpired = decodedToken.exp * 1000 < Date.now();
  //       if (isExpired) {
  //         // If expired, clear the token and user state
  //         localStorage.removeItem("authToken");
  //         setUser(null);
  //       } else {
  //         // If valid, set the user state with the name from the token
  //         setUser({ name: decodedToken.name });
  //       }
  //     } catch (error) {
  //       // If the token is invalid or malformed, clear it
  //       console.error("Invalid token:", error);
  //       localStorage.removeItem("authToken");
  //       setUser(null);
  //     }
  //   }
  // }, []);
  const getInitials = (name: string) => {
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
  // Use a ref to track the initial render
  const isInitialRender = useRef(true);
  useEffect(() => {
    // If it's the first time the component renders, do nothing.

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (debouncedSearchTerm) {
      params.set("query", debouncedSearchTerm);
    } else {
      params.delete("query");
    }

    // Always navigate to the products page to show search results
    router.push(`/products?${params.toString()}`);
  }, [debouncedSearchTerm, router, searchParams]); // Removed pathname

  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        E-Shop
      </Link>

      <div className="flex items-center w-full max-w-md bg-gray-100 rounded-lg overflow-hidden border focus-within:ring-2 focus-within:ring-blue-500">
        <div className="pl-3 pr-2 text-gray-500">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-2 py-2 bg-gray-100 focus:outline-none"
        />
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
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
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
        ) : (
          <Link href="/login">
            <Button variant="ghost">
              <LogIn className="w-5 h-5 mr-2" />
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
