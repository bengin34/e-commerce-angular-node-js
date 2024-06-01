const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db/db");

app.use(express.json());
app.use(cors());


// app.get("",(req,res)=> {
//     res.json({message: "Api call works"})
// })


connection()

const port = process.env.PORT || 8000;
app.listen(port, console.log("app is working on http://localhost:8000"));
