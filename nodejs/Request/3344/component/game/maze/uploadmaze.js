const fs = require("fs");

module.exports = async datas => new Promise((resolve) => {
	let returnDatas = {};
	if(datas){
		// fs.rename(datas.file[0].path,__dirname+"/files/aa.jpg",(err)=>{
		// 	if(err){
		// 		throw Error("改名失败");
		// 	}
		// });

		returnDatas ={
			datas
		};
	}
	resolve(JSON.stringify(returnDatas));
});
