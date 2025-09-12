import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: "#222",
        color: "#fff",
        padding: "1.5rem 0",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <div>
        <p>
          &copy; {new Date().getFullYear()} E-Commerce Store. All rights
          reserved.
        </p>
        <nav>
          <Link href="/about" style={{ color: "#fff", margin: "0 1rem" }}>
            About
          </Link>
          <Link href="/contact" style={{ color: "#fff", margin: "0 1rem" }}>
            Contact
          </Link>
          <Link href="/privacy" style={{ color: "#fff", margin: "0 1rem" }}>
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
