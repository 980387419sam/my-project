const sokobanPost = require("./api/sokobanPost");
const sokobanGet = require("./api/sokobanGet");

module.exports = {
	type:{
		"/game/sokoban/post":"post",
		"/game/sokoban/get":"get"
	},
	callback:{
		"/game/sokoban/post":sokobanPost,
		"/game/sokoban/get":sokobanGet
	}
};