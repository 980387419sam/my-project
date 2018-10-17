
const MongoClient = require('mongodb').MongoClient;
const common = require('../../src/common');
const errors = require("../error")

// http://www.runoob.com/nodejs/nodejs-mongodb.html

class Mongo {
    constructor(){
        this.db = null
    }
    init(){
        return new Promise((res,rej)=>{
            const urls = common.mongoUrl+'/'+common.mongoPath
            MongoClient.connect(urls,(err, db)=> {
                if (err){
                    res()
                    console.log('mongodb开启失败')
                    throw err
                }else{
                    this.db = db
                    this.dbo = db.db(common.mongoPath);
                    res()
                    console.log('mongodb开启:'+urls)
                }
            });
        })
    }
    collectionAfter({err,res,cb}){
        const datas = {
            state:0,
            data:res,
        }
        if(err){
            const state = 30001
            datas.state = state
            datas.message = errors[state]
            cb(datas)
            throw err
        }else{
            cb(datas)
            this.db.close();
        }
    }
    collection({name,datas,cb}){
        this.dbo.collection(name).find(datas).toArray((err,res)=>{
            this.collectionAfter({err,res,cb})
        });
    }
}


module.exports = Mongo