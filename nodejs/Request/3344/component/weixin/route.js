const sendmes = require("./api/sendmes");

module.exports = {
	type:{
		"/weixin/sendmes":"post",
		"/weixin/option":"get"
	},
	callback:{
		"/weixin/sendmes":sendmes,
	}
};