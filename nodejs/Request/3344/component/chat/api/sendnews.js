const fs = require("fs");
const checkToken = require("./checkToken");


const setInformation =(datas)=> new Promise((resolve)=>{
	const path = __dirname+"/information";
	fs.readFile(path, function (err, file) {
		if (err) {
			return console.error(err);
		}
		const strs = file.toString();
		let data = {};
		if(strs){
			data = JSON.parse(strs);
		}
		data[datas.date]=datas;
		fs.writeFile(path, JSON.stringify(data), (err)=>{
			if (err) {
				return console.error(err);
			}
			resolve({state:0});
		});
	});
});

module.exports = async datas => new Promise(async(resolve) => {
	if(!datas.content||!datas.date||!datas.token||!datas.username){
		resolve(JSON.stringify({ state:3, mes:"提交错误" }));
		return;
	}
	const res =await checkToken(datas);
	if(res.state){
		resolve(JSON.stringify(res));
	}else{
		const data =await setInformation(datas);
		resolve(JSON.stringify(data));
	}
});
