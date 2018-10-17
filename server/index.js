
const http = require("http");
const Request = require("./Request/index.js");
const common = require("../common");
const Mongo = require("./mongod");
const Fs = require("./fs");

const mongod = new Mongo();
const fs = new Fs();
mongod.init().then(()=>{
    http.createServer((req, res)=>{
        Request({req, res, mongod, fs})
    }).listen(common.serverPort);
    console.log('监听：http://localhost:'+common.serverPort);
})
