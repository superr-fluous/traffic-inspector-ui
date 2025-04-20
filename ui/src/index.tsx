import React from "react";
import { createRoot } from "react-dom/client";
import { Route, Link, Switch, Redirect } from "wouter";

import Navbar from "@layout/navbar";
import PageWrapper from "@layout/page";

import FlowsPage from "@pages/flows";
import FlowInfoPage from "@pages/flow-info";

import "./index.css";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

const App = () => (
	<>
		<Navbar>
			<Link to="/dashboard">Dashboard</Link>
			<Link to="/flows">Flows</Link>
		</Navbar>
		<PageWrapper>
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
		</PageWrapper>
	</>
);

root.render(<App />);
