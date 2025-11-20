import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authorRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
app.use(express.json());
// Enable CORS for all origins (allows requests from any domain)
// Explicitly allow common methods and headers to avoid client issues.
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose.connect(
  process.env.MONGO_URL || "mongodb://localhost:27017/apiAuhors"
);

// Serve frontend static files from the `public` directory
app.use(express.static("public"));

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
