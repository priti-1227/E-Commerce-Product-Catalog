import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Shop",
  description: "E-commerce app assessment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* The Navbar is removed from here */}
      <body className={inter.className}>
        <StoreProvider>
          <Toaster position="top-center" />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
