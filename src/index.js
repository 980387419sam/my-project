import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import routers from "./router";
import './style.css'
ReactDOM.render(<BrowserRouter >
    <div>
        { routers.map(({ path, component }) => (
            <Route
                exact={path === "/"}
                key={path}
                path={path}
                component={component}
            />
        )) }
    </div>
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
