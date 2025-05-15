import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Store from "./pages/Store";
import Checkout from "./pages/Checkout";
import ProductPage from "./pages/ProductPage";
import LoginRegister from "./pages/LoginRegister";
import Admin from './pages/Admin';
import ProtectedAdminRoute from "./features/ProtectedAdminRoute";
import ProfilePage from "./pages/ProfilePage";
import OrderConfirmation from "./pages/OrderConfirmation";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/checkout", element: <Checkout /> },
            { path: "*", element: <NotFound /> },
            { path: "Store", element: <Store /> },
            { path: "products/:id", element: <ProductPage />},
            { path: "login-register", element: <LoginRegister /> },
            { path: 'admin', element: <ProtectedAdminRoute><Admin /></ProtectedAdminRoute> },
            { path: "profile", element: <ProfilePage /> },
            { path: "order-confirmation/:id", element: <OrderConfirmation /> },
        ],
    },
]);