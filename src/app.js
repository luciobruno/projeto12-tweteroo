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
    res.status(201).send("OK")
})

app.post("/tweets", (req,res)=>{
    const {username,tweet} = req.body
    const usuario = usuarios.find(usuario => usuario.username === username)
    if(usuario === undefined){
        res.sendStatus(401)
        return
    }
    if(!username || !tweet || typeof username !== "string" || typeof tweet !== "string"){
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }
    const avatar = usuario.avatar
    tweets.push({username:username, avatar:avatar, tweet:tweet})
    res.status(201).send("OK")
})

app.get("/tweets", (req,res)=>{
    const lastTweets = tweets.slice(-10)
    res.send(lastTweets)
})

app.get("/tweets/:USERNAME", (req,res)=>{
    const { USERNAME } = req.params
    const userTweets = tweets.filter(tweet => tweet.username === USERNAME)
    res.send(userTweets)
})

app.listen(5000);