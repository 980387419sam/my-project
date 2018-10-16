
import defaultComponent from "./Component/default.jsx";
import page from './Pages/route'
import v2 from './v2/route'

export default [
    { path: "/", component: defaultComponent },
    ...page,
    ...v2
];
