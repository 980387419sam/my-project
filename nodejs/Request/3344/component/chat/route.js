const login = require("./api/login");
const sendnews = require("./api/sendnews");
const getnews = require("./api/getnews");

module.exports = {
	type:{
		"/chat/login":"get",
		"/chat/sendnews":"post",
		"/chat/getnews":"post",
	},
	callback:{
		"/chat/login":login,
		"/chat/sendnews":sendnews,
		"/chat/getnews":getnews,
	}
};