
const http = require("http");

const Request1314 = require("./Request/1314/index.js");

const Mongodb = require('./Mongodb/index.js');

(()=>{
    const port = 1314
    const mongodb = new Mongodb();
    mongodb.init(''+port).then((mongo)=>{
        if(mongo){
            console.log('开启数据库：mongodb://localhost:27017/'+port);
            http.createServer((req, res)=>{
                Request1314(req, res, mongo)
            }).listen(port);
            console.log('监听：http://localhost:'+port);
        }
    })
})()

