const fs = require("fs");
const errors = require('./error')

// http://www.runoob.com/nodejs/nodejs-fs.html

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
    delFile({path}){
        return new Promise((res)=>{
            fs.unlink(path, ()=>{
                res({state:0})
            })
        })
    }
    writeFile({path,string}){
        return new Promise((res)=>{
            fs.writeFile(path, string, (err, data)=>{
                this.readAfter({err, data,res})
            })
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
    mkdir({path}){
        return new Promise((res)=>{
            fs.mkdir(path,(err)=>{
                this.readAfter({err, data:null,res})
            });
        })
    }
    readdir({path}){
        return new Promise((res)=>{
            fs.readdir(path, (err, data)=>{
                this.readAfter({err, data, res})
            })
        })
    }
    rmdir({path}){
        return new Promise((res)=>{
            fs.rmdir(path, (err)=>{
                this.readAfter({err, data:null, res})
            })
        })
    }
}

module.exports = Fs