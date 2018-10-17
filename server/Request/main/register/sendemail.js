const names = require("../../../mongod/names")
const errors = require("../../../error")
const sendEmail = require("../../../common/sendEmail")

// post : {
//     email:'email'
// }
// success: {
//     state:0,
//     available:boolean,
// }
// fail:{
//     state:10000,
//     message:'xxx'
// }



module.exports = async (datas, alls) => new Promise((resolve) => {
    if(!datas.email){
        resolve(JSON.stringify({
            state:10001,
            message:'email'+errors[10001],
        }))
        return;
    }
    const mongo = alls.mongo
    mongo.collection({
        name:names.user,
        datas:{email:datas.email},
        cb:(res)=>{
            if(res.state){
                resolve(JSON.stringify(res));
            }else{
                const available = !res.data.length
                if(available){
                    sendEmail({
                        option:{
                            to:datas.email,
                            subject:'余朝辉项目验证',
                            text:"验证码："+1234
                        },
                        callback:(result)=>{
                            resolve(JSON.stringify(result));
                        }
                    })
                }else{
                    resolve(JSON.stringify({
                        state:0,
                        available,
                    }));
                }
            }
        }
    })
});
