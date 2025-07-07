import React, { useRef, useState } from "react";
import type { FC } from "react";

import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";

import CancelOutlined from "@mui/icons-material/CancelOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import styles from "../styles.module.css";

interface Props {
	addMode: boolean;
	deleteMode: boolean;
	onCancel: VoidFunction;
	onDelete: VoidFunction;
	onManageWidgets: VoidFunction;
	onSelectWidgetSize: (size: { w: number; h: number }) => void;
}

const Toolbar: FC<Props> = ({ addMode, deleteMode, onCancel, onDelete, onManageWidgets, onSelectWidgetSize }) => {
	const [showSizeMenu, setShowSizeMenu] = useState(false);
	const menuAnchor = useRef<HTMLButtonElement>(null);

	const selectWidgetSize: Props["onSelectWidgetSize"] = (size) => {
		setShowSizeMenu(false);
		onSelectWidgetSize(size);
	};

	return (
		<div className={styles.toolbar}>
			<div className={styles["toolbar-group"]}>
				{!addMode && (
					<>
						<Button
							ref={menuAnchor}
							startIcon={<AddIcon />}
							disabled={deleteMode}
							onClick={() => setShowSizeMenu(true)}
						>
							Add widget
						</Button>
						<Menu
							open={showSizeMenu}
							anchorEl={menuAnchor.current}
							onClose={() => setShowSizeMenu(false)}
							anchorOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
						>
							<MenuItem onClick={() => selectWidgetSize({ w: 1, h: 1 })}>1x1</MenuItem>
							<MenuItem onClick={() => selectWidgetSize({ w: 2, h: 2 })}>2x2</MenuItem>
							<MenuItem onClick={() => selectWidgetSize({ w: 3, h: 3 })}>3x3</MenuItem>
							<MenuItem onClick={() => selectWidgetSize({ w: 4, h: 4 })}>4x4</MenuItem>
						</Menu>
					</>
				)}
				{addMode && (
					<Button startIcon={<CancelOutlined />} onClick={onCancel}>
						Cancel
					</Button>
				)}
				{!deleteMode && (
					<Button startIcon={<DeleteForeverIcon />} disabled={addMode} onClick={onDelete}>
						Delete widget
					</Button>
				)}
				{deleteMode && (
					<Button startIcon={<CancelOutlined />} onClick={onCancel}>
						Cancel
					</Button>
				)}
			</div>
			<div className={styles["toolbar-group"]}>
				<Button startIcon={<SettingsApplicationsIcon />} disabled={addMode || deleteMode} onClick={onManageWidgets}>
					Manage widgets
				</Button>
			</div>
		</div>
	);
};

export default Toolbar;
