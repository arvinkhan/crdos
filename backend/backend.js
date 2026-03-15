const express = require("express")

const app = express()

app.get("/api/products",(req,res)=>{

    console.log("Backend HIT: products")

    const page = req.query.page || 1

    res.json({
        page:page,
        products:[
            {id:1,name:"Laptop"},
            {id:2,name:"Phone"},
            {id:3,name:"Headphones"}
        ]
    })

})

app.get("/api/users",(req,res)=>{

    console.log("Backend HIT: users")

    res.json({
        users:[
            {id:1,name:"Alice"},
            {id:2,name:"Bob"}
        ]
    })

})

app.listen(4000,()=>{
    console.log("Backend server running on port 4000")
})