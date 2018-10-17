
const http = require("http");
const Request = require("./Request/index.js");
const common = require("../src/common");
const Mongo = require("./mongod");
const Fs = require("./fs");

const mongo = new Mongo();
const fs = new Fs();
mongo.init().then(()=>{
    http.createServer((req, res)=>{
        Request({req, res, mongo, fs})
    }).listen(common.serverPort);
    console.log('监听：http://localhost:'+common.serverPort);
})
