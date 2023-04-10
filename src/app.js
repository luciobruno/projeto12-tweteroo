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

app.post("/tweets", (req,res)=>{
    const {username,tweet} = req.body
    const usuario = usuarios.find(usuario => usuario.username === username)
    if(usuario === undefined){
        res.send("UNAUTHORIZED")
    }else{
        const avatar = usuario.avatar
        tweets.push({username:username, avatar:avatar, tweet:tweet})
        res.send("OK")
    }
})

app.get("/tweets", (req,res)=>{
    const lastTweets = tweets.slice(-10)
    res.send(lastTweets)
})

app.listen(5000);