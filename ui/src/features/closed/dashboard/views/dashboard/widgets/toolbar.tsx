import React from "react";
import type { FC } from "react";

import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import styles from "../../shared/styles.module.css";

interface Props {
	unassignedWidgetsNum: number;
	onManageWidgets: VoidFunction;
}

const Toolbar: FC<Props> = ({ unassignedWidgetsNum, onManageWidgets }) => {
	return (
		<div className={styles.toolbar}>
			<div className={styles["toolbar-group"]}>
				{/* badge is not shown if badgeContent={0} by default - `showZero` */}
				<Tooltip title={`Unassigned widgets: ${unassignedWidgetsNum}`} placement='top-start'>
					<Badge
						color='secondary'
						badgeContent={unassignedWidgetsNum}
						sx={{
							"& .MuiBadge-badge": {
								top: "6px",
								color: "var(--nav-bg)",
								border: "2px solid var(--nav-bg)",
								fontWeight: 600,
							},
						}}
					>
						<Button startIcon={<SettingsApplicationsIcon />} onClick={onManageWidgets}>
							Manage widgets
						</Button>
					</Badge>
				</Tooltip>
			</div>
		</div>
	);
};

export default Toolbar;
