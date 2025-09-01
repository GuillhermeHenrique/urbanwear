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

// To read cookies
app.use(cookieParser());

// config json
app.use(express.json());

// public folder for images
app.use(express.static());

app.listen(5000);
