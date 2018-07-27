const http = require("http");
const fs = require("fs");

const getTranslate = async datas => new Promise((resolve) => {
	const option = {
		host: "fanyi.baidu.com",
		path: "/v2transapi"+datas.path,
		headers:JSON.parse(datas.headers),
	};
	http.get(option, (response) => {
		let resData = "";
		response.on("data", (data) => {
			resData += data;
		});
		response.on("end", (e) => {
			if (e) console.log(e);
			resolve(resData);
		});
	});
});

module.exports = {
	getTranslate,
};
