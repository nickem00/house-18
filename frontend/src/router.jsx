import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Store from "./pages/Store";
import Checkout from "./pages/Checkout";
import LoginRegister from "./pages/LoginRegister";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/checkout", element: <Checkout /> },
            { path: "*", element: <NotFound /> },
            { path: "Store", element: <Store /> },
            { path: "Login-Register", element: <LoginRegister /> },
        ],
    },
]);