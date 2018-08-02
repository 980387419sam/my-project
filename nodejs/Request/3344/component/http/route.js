const gethttp = require("./api/get");
const posthttp = require("./api/request");
const upload = require("./api/upload");

module.exports = {
	type:{
		"/http/get":"get",
		"/http/post":"post",
		"/http/upload":"upload"
	},
	callback:{
		"/http/get":gethttp,
		"/http/post":posthttp,
		"/http/upload":upload
	}
};