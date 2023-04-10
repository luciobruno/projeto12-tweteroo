import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const usuarios = []
const tweets = []

app.post("/sign-up", (req, res)=>{
    const {username, avatar} = req.body
    if(!username|| !avatar || typeof username !== "string" || typeof avatar !== "string"){
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }
    usuarios.push(req.body)
    res.status(201).send("OK")
})

app.post("/tweets", (req,res)=>{
    const { tweet, username } = req.body
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
    const page = parseInt(req.query.page)
    if(page === undefined || page<1){
        res.status(400).send("Informe uma página válida!")
        return
    }
    let max = tweets.length
    let min = max - (10)
    if(min < 0){
        min = 0
    }
    if(page>1 && max > 0){
        max = max - 10(page-1)
    }
    const lastTweets = tweets.slice(min,max)
    res.send(lastTweets)
})

app.get("/tweets/:USERNAME", (req,res)=>{
    const { USERNAME } = req.params
    const userTweets = tweets.filter(tweet => tweet.username === USERNAME)
    res.send(userTweets)
})

app.listen(5000);