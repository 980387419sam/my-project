
import defaultComponent from "./Component/Default";
import reptileComponent from "./Component/Reptile";
import solarComponent from "./Component/Solar";
import ballComponent from "./Component/Ball";
import echartRoutes from "./Component/Echart/router";
import weixinRoutes from "./Component/Weixin/router";
import fileRoutes from "./Component/file/router";
import chatRoutes from "./Component/chat/router";
import gameRoutes from "./Component/game/router";
import ImageConverterRoutes from "./Component/ImageConverter/router";

export default [
	{ path: "/", component: defaultComponent },
	{ path: "/reptile", component: reptileComponent },
	{ path: "/solar", component: solarComponent },
	{ path: "/ball", component: ballComponent },
	...echartRoutes,
	...weixinRoutes,
	...fileRoutes,
	...chatRoutes,
	...gameRoutes,
	...ImageConverterRoutes
];
