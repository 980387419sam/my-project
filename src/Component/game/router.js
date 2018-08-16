
import index from "./index";
import list from "./list";
import sokoban from "./Sokoban";

export default [
	{ path: "/game", component: index },
	{ path: "/game/list", component: list },
	{ path: "/game/sokoban", component: sokoban },
];
