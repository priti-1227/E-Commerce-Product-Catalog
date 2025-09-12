import Footer from "../component/Shared/Footer";
import Navbar from "../component/Shared/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* pt-16 is an example: adds padding to offset a fixed navbar */}
        {children}
      </main>
      <Footer />
    </>
  );
}
