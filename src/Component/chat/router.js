
import index from "./index";
import login from "./login";
import view from "./view";

export default [
	{ path: "/chat", component: index },
	{ path: "/chat/login", component: login },
	{ path: "/chat/view/:name/:token", component: view },
];
