const fs = require("fs");
const checkToken = require("./checkToken");

const getInformation = (datas)=>new Promise((resolve)=>{
	const path = __dirname+"/information";
	let count = 0; 
	let files = "";
	let res = {};
	const timer = setInterval(()=>{
		if(count === 100){
			clearInterval(timer);
			res = {
				state:0,
				information:[]
			};
			resolve(res);
		}else{
			fs.readFile(path, function (err, file) {
				if (err) {
					return console.error(err);
				}
				const strs = file.toString();
				if(strs){
					if(count===0){
						files = strs;
						const data = JSON.parse(strs);
						const keys = Object.keys(data);
						const key = keys.filter(k=>(k>=datas.date));
						if(key.length){
							const information = [];
							key.forEach(k=>{
								information.push(data[k]);
							});
							clearInterval(timer);
							res = {
								state:0,
								information:information
							};
							resolve(res);
						}else{
							count+=1;
						}
					}else if(files === strs){
						count+=1;
					}else{
						const data = JSON.parse(strs);
						const keys = Object.keys(data);
						const key = keys.filter(k=>(k>=datas.date));
						const information = [];
						key.forEach(k=>{
							const infor = data[k];
							information.push({
								username:infor.username,
								content:infor.content,
								time:infor.time,
							});
						});
						clearInterval(timer);
						res = {
							state:0,
							information:information
						};
						resolve(res);
					}
				}else{
					count+=1;
				}
			});
		}
	},200);
});

module.exports = async datas => new Promise(async(resolve) => {
	if(!datas.date||!datas.token||!datas.username){
		resolve(JSON.stringify({ state:3, mes:"提交错误" }));
		return;
	}
	const res =await checkToken(datas);
	if(res.state){
		resolve(JSON.stringify(res));
	}else{
		const r =await getInformation(datas);
		resolve(JSON.stringify(r));
	}
});
