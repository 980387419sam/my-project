const gethttp = require("./api/get");
const requesthttp = require("./api/request");

module.exports = {
	type:{
		"/http/get":"get",
		"/http/request":"post"
	},
	callback:{
		"/http/get":gethttp,
		"/http/request":requesthttp
	}
};