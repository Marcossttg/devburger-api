import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import {
	Home,
	Login,
	Products,
	Register,
} from "../containers";

import PrivateRoute from "./private-route";

function Routes() {

	return (
		<Router>
			<Switch>
				<Route component={Login} path="/login"></Route>
				<Route component={Register} path="/cadastro"></Route>
				<PrivateRoute exact component={Home} path="/"></PrivateRoute>
				<PrivateRoute component={Products} path="/produtos"></PrivateRoute>
			</Switch>
		</Router>
	)
}

export default Routes
