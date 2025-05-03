import { Outlet } from "react-router-dom";
import Header from "./components/Header"; // Placeholder
import Footer from "./components/Footer"; // Placeholder

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}