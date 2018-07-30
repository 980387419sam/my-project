const { getReptileData } = require("./component/reptile");
const { getTranslate } = require("./component/baiduTranslate");
const weixin =  require("./component/weixin/route");
const http = require("./component/http/route");

const errorType = require("../../../src/errorConfig");

const defaultData = (data) => {
	const datas = {
		error_code: "10000",
		error_message: errorType["10000"],
	};
	return JSON.stringify(datas);
};

const reptileData = async (data) => await getReptileData(data);

const translate = async (data) => await getTranslate(data);

const routes = [weixin,http];

const routers = {
	type:{
		"defaultData":"get",
		"/reptile":"get",
		"/translate":"post",
		"/posttest":"post",
	},
	callback:{
		"defaultData":defaultData,
		"/reptile":reptileData,
		"/translate":translate,
		"/posttest":(data)=>{return JSON.stringify(data);},
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
