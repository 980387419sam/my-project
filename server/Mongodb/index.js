var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";

class Mongodb {
    init(port){
        return new Promise((res,rej)=>{
            MongoClient.connect(url+'/'+port,(err, db)=> {
                if (err){
                    throw err
                };
                this.mongo = db.db(port+'');
                res(this)
            });
        })
    }
}


module.exports = Mongodb
