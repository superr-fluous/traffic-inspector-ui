import React from "react";
import type { FC, MouseEventHandler, PropsWithChildren } from "react";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";

import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { COLORS } from "@layout/theme";

import styles from "./styles.module.css";
import { useLocation } from "wouter";

const Navbar: FC<PropsWithChildren> = ({ children }) => {
	const [location, navigate] = useLocation();

	console.log(location);

	const handleNavigate =
		(route: string): MouseEventHandler<HTMLAnchorElement> =>
		(e) => {
			e.preventDefault();
			navigate(route);
		};

	return (
		// <AppBar style={{ flex: "0 0 12rem", height: "100vh", maxHeight: }}>
		// 	<Container>
		// 		<Toolbar disableGutters className={styles["navbar-toolbar"]}>
		// 			<div className={styles["logo-container"]}>
		// 				<Typography variant='navTitle'>Traffic Inspector</Typography>
		// 			</div>

		// 			<Divider style={{ borderColor: COLORS.secondary }} orientation='vertical' variant='middle' flexItem />

		// 			<div className={styles["nav-links"]}>{children}</div>
		// 		</Toolbar>
		// 	</Container>
		// </AppBar>
		<nav className={styles.navbar}>
			<ul className={styles["nav-list"]}>
				<li className={location.startsWith("/dashboard") ? styles.active : undefined}>
					<Link
						href='/dashboard'
						onClick={handleNavigate("/dashboard")}
						variant='navLink'
						underline='none'
						color={COLORS["off-white"]}
					>
						Dashboard
					</Link>
				</li>
				<li className={location.startsWith("/flows") ? styles.active : undefined}>
					<Link
						href='/flows'
						onClick={handleNavigate("/flows")}
						variant='navLink'
						underline='none'
						color={COLORS["off-white"]}
					>
						Flows
					</Link>
				</li>
			</ul>

			<div className={styles["logo-container"]}>
				<Typography variant='navTitle'>Traffic Inspector</Typography>
			</div>
		</nav>
	);
};

export default Navbar;

