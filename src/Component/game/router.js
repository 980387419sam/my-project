
import index from "./index";
import list from "./list";
import sokoban from "./Sokoban";
import maze from "./Maze";

export default [
	{ path: "/game", component: index },
	{ path: "/game/list", component: list },
	{ path: "/game/sokoban", component: sokoban },
	{ path: "/game/maze", component: maze },
];
