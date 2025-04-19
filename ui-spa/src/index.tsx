import React from "react";
import { createRoot } from "react-dom/client";
import { Route, Link, Switch, Redirect } from "wouter";

import FlowsPage from "@pages/flows";
import FlowInfoPage from "@pages/flow-info";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

const App = () => (
	<>
		<Link href="/dashboard">Dashboard</Link>
		&nbsp;
		<Link href="/flows">Flows</Link>
		<Switch>
			<Route path="/dashboard">
				<p>Dashboard</p>
			</Route>
			<Route path="/flows" component={FlowsPage} />
			<Route path="/flows/:id">
				{(params) => <FlowInfoPage flow_id={params.id} />}
			</Route>
			<Route path="*">
				<Redirect to="/dashboard" />
			</Route>
		</Switch>
	</>
);

root.render(<App />);
