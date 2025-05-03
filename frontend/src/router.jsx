import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home"; // Placeholder
import NotFound from "./pages/NotFound"; // Placeholder

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);