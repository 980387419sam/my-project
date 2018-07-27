const https = require("https");
const fs = require("fs");

const saveFile = (resData, datas, resolve) => {
	fs.writeFile(decodeURIComponent(datas.fieldName), resData, (e) => {
		if (e) {
			return console.error(e);
		}
		resolve(resData);
	});
};

const getReptileData = async datas => new Promise((resolve) => {
	const option = {
	  host: "www.aigongzuo.com",
	  port: 52038,
	  path: "/api/v1/users",
	  headers: { authToken: "" },
	};
	https.get(option, (response) => {
	  let resData = "";
	  response.on("data", (data) => {
	    resData += data;
	  });
	  response.on("end", (e) => {
	    if (e) console.log(e);
	    saveFile(resData, datas, resolve);
	  });
	});
});

module.exports = {
	getReptileData,
};
