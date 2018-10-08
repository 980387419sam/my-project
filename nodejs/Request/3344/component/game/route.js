const sokobanPost = require("./sokoban/sokobanPost");
const sokobanGet = require("./sokoban/sokobanGet");
const getmaze = require("./maze/getmaze");
const postmaze = require("./maze/postmaze");

module.exports = {
	type:{
		"/game/sokoban/post":"post",
		"/game/sokoban/get":"get",
		"/game/maze/get":"get",
		"/game/maze/post":"post"
	},
	callback:{
		"/game/sokoban/post":sokobanPost,
		"/game/sokoban/get":sokobanGet,
		"/game/maze/post":postmaze,
		"/game/maze/get":getmaze
	}
};