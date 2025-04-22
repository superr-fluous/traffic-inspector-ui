import React from "react";
import { createRoot } from "react-dom/client";
import { Route, Switch, Redirect } from "wouter";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";


import Navbar from "@layout/navbar";
import PageWrapper from "@layout/page";
import Theme, { COLORS } from "@layout/theme";

import FlowsPage from "@pages/flows";
import FlowInfoPage from "@pages/flow-info";

import "./index.css";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

const theme = createTheme(Theme);

const App = () => (
	<ThemeProvider theme={theme}>
		<Navbar>
			<Link href="/dashboard" variant="navLink" underline="none" color={COLORS["off-white"]}>Dashboard</Link>
			<Link href="/flows" variant="navLink" underline="none" color={COLORS["off-white"]}>Flows</Link>
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
	</ThemeProvider>
);

root.render(<App />);
