import React from "react";
import type { FC } from "react";

import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import styles from "../../shared/styles.module.css";

interface Props {}

const Toolbar: FC<Props> = () => {
	return (
		<div className={styles.toolbar}>
			<div className={styles["toolbar-group"]}>
			</div>
		</div>
	);
};

export default Toolbar;
