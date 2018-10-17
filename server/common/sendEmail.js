const nodemailer = require('nodemailer');
const errors = require("../error");

const myEmail = "965945892@qq.com"
const pass = "nwvrgdtrfqukbdja"

module.exports = ({option,callback})=>{
    const config = {
        host: 'smtp.qq.com',
        port: 587,
        auth: {
            user: myEmail,
            pass: pass 
        }
    };
    const transporter = nodemailer.createTransport(config);
    const options = {
        ...option,
        from: myEmail,
        // to:'',
        // subject:'aaa',
        // text:'bbb',
        // html:'<h1>你好，这是一封来自的邮件！</h1>',
        // attachments    :
        // 	[
        // 		{
        // 			filename: 'img1.png',            // 改成你的附件名
        // 			path: '../../public/images/1.jpg',  // 改成你的附件路径
        // 			cid : '00000001'                 // cid可被邮件使用
        // 		}
        // 	]
    };
    transporter.sendMail(options, function(error, info){
        const datas = {
            state:0
        }
        if(error) {
            datas.state = 50001
            datas.message = errors[datas.state]
        }else{
            datas.data = info
        }
        callback(datas)
    });
}