
import defaultComponent from "./Component/default.jsx";
import main from './Main/route'

export default [
    { path: "/", component: defaultComponent },
    ...main,
];
