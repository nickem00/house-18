import express from "express";
import cors from "cors";
import userRoutes from "./routes/user_routes.js";
import productRoutes from "./routes/product_routes.js";

// Import routes
// import userRoutes from "./routes/user.js"; (EXAMPLE)

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/users", userRoutes); (EXAMPLE)

app.use("/", userRoutes); // User routes
app.use("/", productRoutes); // Product routes

// Example route for testing
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
})

// 404
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
})

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled Server Error", err);
    res.status(500).json({ error: "Internal Server Error" });
})

export default app;