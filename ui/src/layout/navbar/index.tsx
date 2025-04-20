import React from "react";
import type { FC, PropsWithChildren } from "react";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";

import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";

import styles from "./styles.module.css";

const Navbar: FC<PropsWithChildren> = ({ children }) => {
	return (
		<AppBar position="static" style={{ backgroundColor: "#CC9900" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters className={styles["navbar-toolbar"]}>
					<div className={styles["logo-container"]}>
						<Typography
							variant="h6"
							noWrap
							component="a"
							className={styles["app-name"]}
						>
							Traffic Inspector
						</Typography>
					</div>

					<Divider
						orientation="vertical"
						variant="middle"
						flexItem
						style={{ borderColor: "#2F2F2F", borderWidth: "1.5px" }}
					/>

					<div className={styles["nav-links"]}>{children}</div>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
