const main = require('./main/route')


const routes = [main];

const errorType = require("../../../src/Request/errorConfig");

const defaultData = (code = '10000') => {
	const datas = {
		error_code: code,
		error_message: errorType[code*1],
	};
	return JSON.stringify(datas);
};

const routers = {
	type:{
		"defaultData":"get",
	},
	callback:{
		"defaultData":defaultData,
	}
};

routes.forEach(route=>{
	if(route.type&&route.callback){
		Object.keys(route.type).forEach(r=>{
			routers.type[r] = route.type[r];
		});
		Object.keys(route.callback).forEach(r=>{
			routers.callback[r] = route.callback[r];
		});
	}
});

module.exports = routers;
