const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db/db");

app.use(express.json());
app.use(cors());

const authRouter = require("./routers/auth.router");
const categoryRouter = require("./routers/category.router");

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);

connection();

const port = process.env.PORT || 8000;
app.listen(port, console.log("app is working on http://localhost:8000"));
