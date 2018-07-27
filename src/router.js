
import defaultComponent from "./Component/Default";
import reptileComponent from "./Component/Reptile";
import solarComponent from "./Component/Solar";
import ballComponent from "./Component/Ball";
import echartRoutes from "./Component/Echart/router";
import weixinRoutes from "./Component/Weixin/router";

export default [
	{ path: "/", component: defaultComponent },
	{ path: "/reptile", component: reptileComponent },
	{ path: "/solar", component: solarComponent },
	{ path: "/ball", component: ballComponent },
	...echartRoutes,
	...weixinRoutes,
];
