
import defaultComponent from "./Component/default.jsx";
import page from './Pages/route'

export default [
    { path: "/", component: defaultComponent },
    ...page,
];
