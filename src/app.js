import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const usuarios = []
const tweets = []

app.post("/sign-up", (req, res)=>{
    const {username, avatar} = req.body
    if(!username || !avatar || typeof username !== "string" || typeof avatar !== "string"){
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }
    usuarios.push(req.body)
    res.sendStatus(201)
})

app.post("/tweets", (req,res)=>{
    const {username,tweet} = req.body
    const usuario = usuarios.find(usuario => usuario.username === username)
    if(usuario === undefined){
        res.send("UNAUTHORIZED")
        return
    }
    if(!username || !tweet || typeof username !== "string" || typeof tweet !== "string"){
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }
    const avatar = usuario.avatar
    tweets.push({username:username, avatar:avatar, tweet:tweet})
    res.sendStatus(201)
})

app.get("/tweets", (req,res)=>{
    const lastTweets = tweets.slice(-10)
    res.send(lastTweets)
})

app.listen(5000);