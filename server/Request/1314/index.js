const url = require("url");
var querystring = require("querystring");
var multiparty = require("multiparty");

const routes = require("./router.js");

class Request {
	async getRouteDatas(route,res, alls) {
		const hrefs = route.split("?");
		const path = hrefs[0];
		const type = routes.type[path];
		const data = this.getRouteData(hrefs[1]);
		if(type === "download"){
			await routes.callback[path](data, alls, res);
		}else{
			let datas = "";
			if (routes.callback[path]) {
				datas =await routes.callback[path](data, alls);
			}else{
				datas = await routes.callback.defaultData(data, alls);
			}
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", });
			res.write(datas);
			res.end();
		}
	}

	getRouteData(datas) {
		if (!datas) return "";
		const items = {};
		datas.split("&").forEach((d) => {
			const ds = d.split("=");
			items[ds[0]] = ds[1] || "";
		});
		return items;
	}
	async postRouteDatas(path,data,alls){
		if (routes.callback[path]) {
			return routes.callback[path](data, alls);
		}
		return routes.callback.defaultData(data, alls);
	}
}

module.exports = async (req, res, mongo) => {
	const request = new Request();
	const IP = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress
	let reqUrl = req.url;
	reqUrl = url.parse(reqUrl);
	const route = reqUrl.path;
	res.setHeader("Access-Control-Allow-Origin", "http://192.168.31.211:3000");
	const alls = {
		IP,
		mongo,
		req,
		res,
	}
	const type = routes.type[route];
	if(type === "post"){
		var post = "";     
		req.on("data", function(chunk){    
			post += chunk;  
		});
		req.on("end",async function(){  
			post = querystring.parse(post); 
			const datas = await request.postRouteDatas(route,post,alls);
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", });
			res.write(datas);
			res.end();
		});
	}else if(type === "upload"){
		res.setHeader("access-control-allow-headers", "authorization,x-requested-with");
		var form = new multiparty.Form();
		form.parse(req,async function(err, fields, files) {
			const datas = await request.postRouteDatas(route,files,alls);
			res.write(datas);
			res.end();
		});
	}else{
		await request.getRouteDatas(route,res,alls);
    }
};

