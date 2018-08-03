const fs = require("fs");
const md5 = require("blueimp-md5");

module.exports = async datas => new Promise((resolve) => {
	const path = __dirname+"/username";
	const name = datas.username;
	const password = datas.passWord;
	const random = Math.random();
	const token = md5(""+name+password+random);
	if(!name){
		resolve(JSON.stringify({state:1,mes:"没有用户名"}));
		return;
	}
	if(!password){
		resolve(JSON.stringify({state:3,mes:"没有密码"}));
		return;
	}
    
	const writeFile = (item)=>{
		fs.writeFile(path, JSON.stringify(item), (err)=>{
			if (err) {
				return console.error(err);
			}
			resolve(JSON.stringify({state:0,token:token}));
		});
	};

	const initFile = ()=>{
		const item = {
			usernames:{
				[name]:{
					username:name,
					password:password,
					token:token,
				}
			}
		};
		writeFile(item);
	};
    
	const readFile = (strs)=>{
		const item = JSON.parse(strs);
		const usernames = item.usernames;
		if(usernames[name]){
			if(usernames[name].password === password){
				usernames[name].token = token;
				writeFile(item);
			}else{
				resolve(JSON.stringify({state:2,mes:"密码不正确"}));
				return;
			}
		}else{
			usernames[name]={
				username:name,
				password:password,
				token:token,
			};
			writeFile(item);
		}
	};

	fs.readFile(path, function (err, file) {
		if (err) {
			return console.error(err);
		}
		const strs = file.toString();
		if(strs){
			readFile(strs);
		}else{
			initFile();
		}
		
	});
});
