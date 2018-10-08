const fs = require("fs");

module.exports = async datas => new Promise((resolve) => {
	const path = __dirname+"/map/"+datas.mapName;
	if(datas.type === "getCount"){
		fs.open(path, "a", ()=>{
			fs.readFile(path, function (err, file) {
				if (err) {
					return console.error(err);
				}
				const strs = file.toString();
				let data = {
					count:0
				};
				if(strs){
					data = JSON.parse(strs);
				}
				resolve(JSON.stringify(data));
			});
		});
	}
});
