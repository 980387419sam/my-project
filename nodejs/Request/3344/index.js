const url = require("url");
var querystring = require("querystring");

const routes = require("./router.js");

class Request {
	async getRouteDatas(route) {
		const hrefs = route.split("?");
		const path = hrefs[0];
		const data = this.getRouteData(hrefs[1]);
		if (routes.callback[path]) {
			return routes.callback[path](data);
		}
		return routes.callback.defaultData(data);
	}

	getRouteData(datas) {
		if (!datas) return "";
		const items = {};
		datas.split("&").map((d) => {
			const ds = d.split("=");
			items[ds[0]] = ds[1] || "";
		});
		return items;
	}
	async postRouteDatas(path,data){
		if (routes.callback[path]) {
			return routes.callback[path](data);
		}
		return routes.callback.defaultData(data);
	}
}

const request = new Request();

const RequestFun = async (req, res) => {
	let reqUrl = req.url;
	reqUrl = url.parse(reqUrl);
	const route = reqUrl.path;
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	if(routes.type[route] === "post"){
		var post = "";     
		req.on("data", function(chunk){    
			post += chunk;  
		});
		req.on("end",async function(){  
			post = querystring.parse(post); 
			const datas = await request.postRouteDatas(route,post);
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", });
			res.write(datas);
			res.end();
		});
	}else{
		const datas = await request.getRouteDatas(route);
		res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", });
		res.write(datas);
		res.end();
	}
};

module.exports = RequestFun;
