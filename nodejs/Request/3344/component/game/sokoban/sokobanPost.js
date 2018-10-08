const fs = require("fs");

module.exports = async datas => new Promise((resolve) => {
	const path = __dirname+"/map/"+datas.mapName;
    
	const writeFileFs = ()=>{
		fs.writeFile(path, JSON.stringify(datas), (err)=>{
			if (err) {
				return console.error(err);
			}
			resolve(JSON.stringify({
				state:0,
				datas:datas
			}));
		});
	};
    
	if(datas.type === "setCount"){
		fs.readFile(path, function (err, file) {
			if (err) {
				return console.error(err);
			}
			const strs = file.toString(); 
			if(strs){
				data = JSON.parse(strs);
				if(datas.count*1<data.count*1){
					writeFileFs();
				}else{
					resolve(JSON.stringify({
						state:0,
						datas:data
					}));
				}
			}else{
				writeFileFs();
			}
		});
		
	}
});
