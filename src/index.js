
import React from "react";
import {render} from "react-dom";
import {Route, BrowserRouter } from "react-router-dom";

import routers from "./router";

render(
	<BrowserRouter >
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
	, document.getElementById("root"));
