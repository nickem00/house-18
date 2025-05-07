import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToHashElement from "./features/ScrollToHashElement";

export default function App() {
  return (
    <>
      <Header />
      <ScrollToHashElement />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
