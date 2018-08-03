


const checkToken = (datas)=>new Promise((resolve)=>{
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

const getInformation = ()=>new Promise((resolve)=>{
	const path = __dirname+"/information";
	let count = 0; 
	let files = "";
	const timer = setInterval(()=>{
		if(count === 100){
			clearInterval(timer);
			resolve({
				state:0,
				information:[]
			});
		}else{
			fs.readFile(path, function (err, file) {
				if (err) {
					return console.error(err);
				}
				const strs = file.toString();
				if(strs){
					if(count ===0){
						files = strs;
					}else{

					}
				}else{
					count+=1;
				}
			});
		}
	},200);
});

module.exports = async datas => new Promise(async(resolve) => {
	const res =await checkToken(datas);
	if(res.state){
		resolve(JSON.stringify(res));
	}else{
		const r =await getInformation();
	}
});
