const http = require("http");

module.exports = async datas => new Promise((resolve) => {
	var post_req = http.request(datas.option, (response) => {
		let resData = "";
		response.on("data", (data) => {
			resData += data;
		});
		response.on("end", (e) => {
			if (e) console.log(e);
			resolve(resData);
		});
	});
	post_req.write(datas.data);
	post_req.end();
});
