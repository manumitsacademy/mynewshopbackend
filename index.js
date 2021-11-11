// server.js
const jsonServer = require('json-server')
var path = require("path")
const lodash = require("lodash");
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
server.use(jsonServer.bodyParser)
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
server.listen(4000, () => {
  console.log('JSON Server is running')
})