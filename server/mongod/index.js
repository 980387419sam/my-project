
const MongoClient = require('mongodb').MongoClient;
const common = require('../common');

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
                    this.db = db.db(common.mongoPath);
                    res()
                    console.log('mongodb开启:'+urls)
                }
            });
        })
    }
}


module.exports = Mongo