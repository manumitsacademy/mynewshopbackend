var express = require("express");
var path = require("path")
var app = express();

module.exports = (req, res, next) => {
    const myURL =  req.url.split('?')
    if(myURL[0]==='/products'){
        console.log("Yes")
    }
    res.header('X-Hello', 'World how are you')
    next()
}