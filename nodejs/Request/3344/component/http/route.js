const gethttp = require("./api/get");
const posthttp = require("./api/request");
const upload = require("./api/upload");
const download = require("./api/download");

module.exports = {
	type:{
		"/http/get":"get",
		"/http/post":"post",
		"/http/upload":"upload",
		"/http/download":"download"
	},
	callback:{
		"/http/get":gethttp,
		"/http/post":posthttp,
		"/http/upload":upload,
		"/http/download":download
	}
};