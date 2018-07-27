const http = require("http");
const fs = require("fs");

const postWeixinData = async datas => new Promise((resolve) => {
	const option = {
		host: "wx2.qq.com",
		path: datas.path,
		method:"POST",
		headers:JSON.parse(datas.headers),
	};
	var post_req = http.request(option, (response) => {
		let resData = "";
		response.on("data", (data) => {
			resData += data;
		});
		response.on("end", (e) => {
			if (e) console.log(e);
			console.log(resData);
			resolve(resData);
		});
	});
	post_req.write(datas.data);
	post_req.end();
});

module.exports = {
	postWeixinData,
};