const sokobanPost = require("./sokoban/sokobanPost");
const sokobanGet = require("./sokoban/sokobanGet");
const uploadmaze = require("./maze/uploadmaze");

module.exports = {
	type:{
		"/game/sokoban/post":"post",
		"/game/sokoban/get":"get",
		"/game/maze/upload":"upload"
	},
	callback:{
		"/game/sokoban/post":sokobanPost,
		"/game/sokoban/get":sokobanGet,
		"/game/maze/upload":uploadmaze,
	}
};