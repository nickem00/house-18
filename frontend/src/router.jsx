import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/checkout", element: <Checkout /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);