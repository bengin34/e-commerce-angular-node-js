const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db/db");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRouter = require("./routers/auth.router");
const categoryRouter = require("./routers/category.router");
const productRouter = require("./routers/product.router");

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/product", productRouter);

connection();

const port = process.env.PORT || 8000;
app.listen(port, console.log("app is working on http://localhost:8000"));
