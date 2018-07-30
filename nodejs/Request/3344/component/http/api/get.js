const http = require("http");

module.exports = async datas => new Promise((resolve) => {
	http.get(datas.option, (response) => {
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
