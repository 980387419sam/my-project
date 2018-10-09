
import index from "./index";
import game from './game/route'

export default [
    { path: "/complete", component: index },
    ...game,
];
