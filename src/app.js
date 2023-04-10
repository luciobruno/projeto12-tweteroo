import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const usuarios = []
const tweets = []

app.post("/sign-up", (req, res)=>{
    usuarios.push(req.body)
    res.send("OK")
})

app.listen(5000);