const express = require("express")
const axios = require("axios")
const path = require("path")
const cache = require("./cache/cache")

const app = express()

let hits = 0
let misses = 0
let logs = []

let totalRequests = 0
let requestsThisSecond = 0
let rps = 0

setInterval(()=>{
    rps = requestsThisSecond
    requestsThisSecond = 0
},1000)

app.get("/dashboard",(req,res)=>{
    res.sendFile(path.join(__dirname,"dashboard/dashboard.html"))
})

app.get("/stats",(req,res)=>{
    res.json({
        hits,
        misses,
        totalRequests,
        rps
    })
})

app.get("/logs",(req,res)=>{
    res.json(logs)
})
app.get("/sender",(req,res)=>{
res.sendFile(path.join(__dirname,"dashboard/sender.html"))
})
app.use("/api", async (req,res)=>{

    totalRequests++
    requestsThisSecond++

    const key = req.originalUrl

    const cached = cache.get(key)

    if(cached){
        hits++

        logs.push({
            time:new Date().toLocaleTimeString(),
            type:"HIT",
            endpoint:key
        })

        return res.json(cached)
    }

    misses++

    logs.push({
        time:new Date().toLocaleTimeString(),
        type:"MISS",
        endpoint:key
    })

    const response = await axios.get("http://localhost:4000"+req.originalUrl)

    cache.set(key,response.data,60000)

    res.json(response.data)
})

app.listen(3000,()=>{
    console.log("CRDAS running on port 3000")
})