import React from "react";
import type { FC } from "react";

import List from "@mui/material/List";
import Switch from "@mui/material/Switch";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import TextFormat from "@mui/icons-material/TextFormat";
import DeleteForever from "@mui/icons-material/DeleteForever";

import type { WidgetModel } from "../model";

interface Props {
	open: boolean;
	widgets: WidgetModel[];
	onClose: VoidFunction;
}

const ManagePanel: FC<Props> = ({ open, widgets, onClose }) => {
	const onItemHover = (id: WidgetModel["id"]) => {
		console.log("enter");
		document.getElementById(id)?.classList?.add("highlight");
	};

	const onItemLeave = (id: WidgetModel["id"]) => {
		console.log("leave");
		document.getElementById(id)?.classList?.remove("highlight");
	};

	return (
		<Drawer
			anchor='right'
			variant='persistent'
			open={open}
			onClose={onClose}
			sx={{
				width: "25%",
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: "25%",
					boxSizing: "border-box",
					background: "var(--bg)",
					borderLeft: "2px solid hsla(248, 46%, 60%, 0.3)",
					padding: "0.25rem",
					display: "flex",
					flexDirection: "column",
					height: "100%",
					maxHeight: "100%",
					overflowX: "hidden",
					overflowY: "auto",
				},
			}}
		>
			<div
				style={{
					display: "inline-flex",
					justifyContent: "space-between",
					alignItems: "center",
					paddingInlineEnd: "1.5rem",
					height: "3rem",
				}}
			>
				<IconButton onClick={onClose} color='primary' sx={{ paddingLeft: "0" }}>
					<DoubleArrowIcon />
				</IconButton>
				<Typography variant='tableHeader'>Manage widgets</Typography>
			</div>
			<Divider />
			<List>
				{widgets.map((widget) => (
					<ListItem
						slotProps={{
							root: { onMouseEnter: () => onItemHover(widget.id), onMouseLeave: () => onItemLeave(widget.id) },
						}}
						dense
						key={widget.id}
						secondaryAction={
							<div
								style={{ display: "inline-flex", gap: "0.25rem", alignItems: "center", justifyContent: "flex-start" }}
							>
								<IconButton color='primary'>
									<DeleteForever />
								</IconButton>
								<IconButton color='primary'>
									<TextFormat />
								</IconButton>
							</div>
						}
					>
						<ListItemButton>
							<ListItemIcon>
								<Switch edge='start' checked={widget.active} color='primary' />
							</ListItemIcon>
							<ListItemText slotProps={{ primary: { sx: { fontSize: "1rem" } } }}>{widget.name}</ListItemText>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default ManagePanel;
