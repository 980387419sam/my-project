const fs = require("fs");
const errors = require('./error')

class Fs {
    readAfter({err, data,res}){
        const datas = {
            state:0,
        }
        if (err) {
            datas.state = 10001
            datas.err = err
            datas.mes = errors[datas.state]
        }else{
            datas.data = data
        }
        res(datas)
    }
    readFile({path,async}){
        if(async){
            return fs.readFileSync(path);
        }
        return new Promise((res)=>{
            fs.readFile(path, (err, data)=> {
                this.readAfter({err, data,res})
            });
        })
    }
    writeFile({path}){
        return new Promise((res)=>{
            // fs.writeFile(path, data[, options], callback)
        })
    }
    open({path,flags}){
        return new Promise((res)=>{
            fs.open(path, flags,(err, data)=> {
                this.readAfter({err, data,res})
            });
        })
    }
    stat({path}){
        return new Promise((res)=>{
            fs.stat(path, (err, data)=> {
                this.readAfter({err, data,res}) 
            })
        })
    }
}

module.exports = Fs