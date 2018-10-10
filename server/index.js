
const http = require("http");

const Request1314 = require("./Request/1314/index.js");

(()=>{
    http.createServer(Request1314).listen(1314);
    console.log('监听：http://localhost:1314')
})()

