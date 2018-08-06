const fs = require("fs");

module.exports = (datas)=>new Promise((resolve)=>{
	const name = datas.username;
	const token = datas.token;
	const path = __dirname+"/username";
	fs.readFile(path, function (err, file) {
		if (err) {
			return console.error(err);
		}
		const strs = file.toString();
		if(strs){
			const usernames = JSON.parse(strs).usernames;
			if(usernames&&usernames[name]&&usernames[name].token === token){
				resolve({ state:0, });
			}else{
				resolve({ state:2, mes:"登录超时" });
			}
		}else{
			resolve({ state:1, mes:"不存在该用户" });
		}
		
	});
});