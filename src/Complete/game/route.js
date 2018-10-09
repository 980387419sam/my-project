
import index from "./index";
import maze from "./maze/route"

export default [
    { path: "/complete/game", component: index },
    ...maze,
];
