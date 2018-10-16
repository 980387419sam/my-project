const register = require("./register/route.js");

const routes = [register]

const routers = {
	type:{},
	callback:{}
};

routes.forEach(route=>{
	if(route.type&&route.callback){
		Object.keys(route.type).forEach(r=>{
			routers.type['/v2'+r] = route.type[r];
		});
		Object.keys(route.callback).forEach(r=>{
			routers.callback['/v2'+r] = route.callback[r];
		});
	}
});

module.exports = routers;