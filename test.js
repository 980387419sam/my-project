

var nodemailer = require('nodemailer');

		// 创建一个SMTP客户端配置
		var config = {
			host: 'smtp.qq.com',
			port: 587,
			auth: {
				user: '965945892@qq.com',
				pass: 'nwvrgdtrfqukbdja' 
			}
		};
		var transporter = nodemailer.createTransport(config);
		var options = {
			from           : '965945892@qq.com',
			to             : '969623997@qq.com',
			subject        : 'aaa',
			text           : 'bbb',
			html           : '<h1>你好，这是一封来自的邮件！</h1>',
			// attachments    :
			// 	[
			// 		{
			// 			filename: 'img1.png',            // 改成你的附件名
			// 			path: '../../public/images/1.jpg',  // 改成你的附件路径
			// 			cid : '00000001'                 // cid可被邮件使用
			// 		}
			// 	]
		};
		console.log(options,config);
		transporter.sendMail(options, function(error, info){
			if(error) {
				return console.log(error);
			}
			console.log('mail sent:', info.response);
		});