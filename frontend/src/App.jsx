import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToHashElement from "./features/ScrollToHashElement";
import CartModal from "./components/CartModal";
import ThemeToggle from "./components/ThemeToggle";
import { useState } from "react";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    <>
      <Header setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ThemeToggle />
      <ScrollToHashElement />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
