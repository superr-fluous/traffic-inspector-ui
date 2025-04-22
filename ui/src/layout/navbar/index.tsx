import React from "react";
import type { FC, PropsWithChildren } from "react";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";

import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";

import { COLORS } from "@layout/theme";

import styles from "./styles.module.css";

const Navbar: FC<PropsWithChildren> = ({ children }) => {
	return (
		<AppBar>
			<Container>
				<Toolbar disableGutters className={styles["navbar-toolbar"]}>
					<div className={styles["logo-container"]}>
						<Typography variant="navTitle">Traffic Inspector</Typography>
					</div>

					<Divider
						style={{ borderColor: COLORS.secondary }}
						orientation="vertical"
						variant="middle"
						flexItem
					/>

					<div className={styles["nav-links"]}>{children}</div>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
