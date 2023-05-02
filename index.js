// server.js
var express = require('express');
var app = express()
const jsonServer = require('json-server')
var path = require("path")
const lodash = require("lodash");
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
var cors = require('cors')
var bodyParser=require('body-parser');
server.use(cors())
server.use(jsonServer.bodyParser)
const jwt = require('jsonwebtoken');
var users = [
    {
        username:'praveen',
        password:'123',
        userId:12
    },
    {
        username:'prateek',
        password:'222',
        userId:47
    },
    {
        username:'alok',
        password:'333',
        userId:17
    },
]
server.post("/login",function(req,res){
    console.log(req.body)
    var s = users.find(function(a){
        if(a.username===req.body.username && a.password===req.body.password){
            return true
        }
    })
    if(s){
        const token = jwt.sign(req.body, "some secret");
        console.log(token)
        res.json({token:token});
    }
    else{
        console.log("erro")
        res.json({err:'passwordnotmatched'})
    }
})

// server.get("/foodItems",function(req,res){
//     let allproducts = router.db.get("foodItems").valueOf();
//     res.json(allproducts)
// })

let productTypes = [];
let allproducts = router.db.get("products").valueOf();
productTypes = allproducts.map((product)=>{
    return product.type
})      
productTypes = Array.from(new Set(productTypes))            
var productsByTypes = {};
productTypes.forEach((t)=>{
    var productsByType = lodash.groupBy(allproducts,{type:t}).true;
    productsByTypes[t]=productsByType;
})    
server.use((req,res,next)=>{
    console.log("server middleware ")
    next();
})
server.get("/hi",(req,res)=>{
    res.send("Please wiat")
})
server.use((req,res,next)=>{
    console.log(req.url);
    console.log(req.url.split("/"));
    switch(req.url.split('/')[1]){        
        case 'allProductsByTypes':
            res.send(productsByTypes);
        break;
        case 'productsByType':
            console.log('productsByType')
            var productType=req.url.split('/')[2]
            res.send(productsByTypes[productType].slice(0,200));
        break;        
        case 'topProductsOfHardGood':
            console.log('topProductsOfHardGood');
            res.send(productsByTypes['HardGood'].slice(0,10));
        break;
        case 'topProductsOfSoftware':
            console.log('topProductsOfSoftware')
            res.send(productsByTypes['Software'].slice(0,10));
        break;
        case 'topProductsOfGame':
            console.log('topProductsOfGame')
            res.send(productsByTypes['Game'].slice(0,10));
        break;
        case 'topProductsOfMovie':
            console.log('topProductsOfMovie')
            res.send(productsByTypes['Movie'].slice(0,10));
        break;
        case 'topProductsOfMusic':
            console.log('topProductsOfMusic')
            res.send(productsByTypes['Music'].slice(0,10));
        break;
        case 'topProductsOfBlackTie':
            console.log('topProductsOfBlackTie')
            res.send(productsByTypes['BlackTie'].slice(0,10));
        break;
        case 'productTypes':
            res.send(productTypes);
        break;
        default:
            next()
    }       
})
server.use(router)
server.listen(4500, () => {
  console.log('JSON Server is running')
})