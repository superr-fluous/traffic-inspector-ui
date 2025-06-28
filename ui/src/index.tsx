import React from "react";
import { createRoot } from "react-dom/client";
import { Route, Switch, Redirect, useLocation } from "wouter";
import type { MouseEventHandler } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";

import Navbar from "@layout/navbar";
import PageWrapper from "@layout/page";
import Theme, { COLORS } from "@layout/theme";

import FlowsPage from "@pages/flows";
import FlowInfoPage from "@pages/deprecated__flow-info";
import DashboardPage from "@pages/dashboard";

import "./index.css";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

const theme = createTheme(Theme);

const App = () => {
	const [_, navigate] = useLocation();

	const handleNavigate =
		(route: string): MouseEventHandler<HTMLAnchorElement> =>
		(e) => {
			e.preventDefault();
			navigate(route);
		};

	return (
		<ThemeProvider theme={theme}>
			<Navbar />
			{/* <Navbar>
				<Link
					href="/dashboard" onClick={handleNavigate('/dashboard')} variant="navLink" underline="none" color={COLORS["off-white"]}>Dashboard</Link>
				<Link href="/flows" onClick={handleNavigate('/flows')} variant="navLink" underline="none" color={COLORS["off-white"]}>Flows</Link>
			</Navbar> */}
			<Switch>
				<Route path='/dashboard' component={DashboardPage} />
				<Route path='/flows/:id?' component={FlowsPage} />
				<Route path='*'>
					<Redirect to='/dashboard' />
				</Route>
			</Switch>
		</ThemeProvider>
	);
};

root.render(<App />);

