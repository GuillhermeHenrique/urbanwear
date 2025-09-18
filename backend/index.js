import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// solve cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// read cookies
app.use(cookieParser());

// config json
app.use(express.json());

// public folder for images
app.use(express.static("public"));

// routes
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";

app.use("/auth", AuthRoutes);
app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);

app.listen(5000);
