import React, { useEffect, useRef, useState } from "react";
import type { FC } from "react";

import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

import DeleteForever from "@mui/icons-material/DeleteForever";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

import type { Layout } from "../../../model";

interface Widget {
	i: Layout["i"];
	name: Layout["meta"]["name"];
	bookmarked: Layout["meta"]["bookmarked"];
	active: Layout["active"];
}

export interface ManagePanelProps {
	open: boolean;
	widgets: Widget[];
	onReset: VoidFunction;
	onClose: VoidFunction;
	onConfirm: VoidFunction;
	onDelete: (id: Layout["i"]) => void;
	onEnable: (id: Layout["i"], enabled: Layout["active"]) => void;
}

const ManagePanel: FC<ManagePanelProps> = ({ open, widgets, onEnable, onClose, onConfirm, onDelete, onReset }) => {
	const [editWidgetName, setEditWidgetName] = useState<Layout["i"] | null>(null);
	const highlightTimeout = useRef<NodeJS.Timeout>(null);

	const addHighlight = (id: Layout["i"]) => {
		if (highlightTimeout.current !== null) {
			clearTimeout(highlightTimeout.current);
			highlightTimeout.current = null;
		}

		const elem = document.getElementById(id);

		if (elem !== null) {
			elem.classList.add("highlight");
			elem.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
		}
		highlightTimeout.current = setTimeout(removeHighlight, 1500, id);
	};

	const removeHighlight = (id: Layout["i"]) => {
		const elem = document.getElementById(id);

		if (elem !== null) {
			elem.classList.remove("highlight");
		}
		highlightTimeout.current = null;
	};

	useEffect(
		() => () => {
			if (open) {
				setEditWidgetName(null);
			}
		},
		[open]
	);

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
					background: "var(--bg-800)",
					borderLeft: "2px solid hsla(248, 46%, 60%, 0.3)",
					display: "flex",
					flexDirection: "column",
					height: "100%",
					maxHeight: "100%",
					overflowX: "hidden",
					overflowY: "auto",
					backdropFilter: "blur(7px)",
				},
			}}
		>
			<Divider sx={{ flex: "0 0 1px", borderWidth: "1px", borderColor: "hsla(248, 46%, 60%, 0.3)" }} />
			<div
				style={{
					display: "inline-flex",
					justifyContent: "space-between",
					alignItems: "center",
					paddingInline: "0.5rem",
					paddingBlock: "0.25rem",
					flex: "0 0 3rem",
				}}
			>
				<IconButton onClick={onClose} color='primary' sx={{ paddingLeft: "0" }}>
					<DoubleArrowIcon />
				</IconButton>
			</div>
			<Divider sx={{ flex: "0 0 1px", borderWidth: "1px", borderColor: "hsla(248, 46%, 60%, 0.3)" }} />
			<div style={{ flex: "1 1 auto", padding: "0.25rem" }}>
				<List sx={{ padding: "0.25rem" }}>
					{widgets.map((widget) => (
						<ListItem
							sx={{ height: "56px", dispay: "inline-flex", justifyContent: "flex-start", gap: "0.5rem" }}
							dense
							key={widget.i}
							secondaryAction={
								<div
									style={{ display: "inline-flex", gap: "0.25rem", alignItems: "center", justifyContent: "flex-start" }}
								>
									<Switch
										edge='start'
										checked={widget.active}
										color='primary'
										onChange={(_, checked) => onEnable(widget.i, checked)}
									/>
									<IconButton color='error' onClick={() => onDelete(widget.i)}>
										<DeleteForever />
									</IconButton>
								</div>
							}
						>
							<>
								<IconButton disabled={!widget.active} color='primary' onClick={() => addHighlight(widget.i)}>
									<LocationSearchingIcon />
								</IconButton>

								<ListItemText
									sx={{ marginLeft: "2rem" }}
									slotProps={{ primary: { sx: { fontSize: "1rem", height: "40px", alignContent: "center" } } }}
								>
									{widget.i === editWidgetName ? (
										<TextField
											id={`name-textfield-${editWidgetName}`}
											size='small'
											defaultValue={widget.name}
											autoFocus
										/>
									) : (
										widget.name
									)}
								</ListItemText>
							</>
						</ListItem>
					))}
				</List>
				<Typography
					sx={{ paddingInline: "2.5rem", marginTop: "1rem" }}
					fontWeight={500}
					variant='baseXl'
					color='primary'
				>
					{widgets.reduce((active, w) => active + Number(w.active), 0)} / {widgets.length}
				</Typography>
			</div>
			<Divider sx={{ flex: "0 0 1px", borderWidth: "1px", borderColor: "hsla(248, 46%, 60%, 0.3)" }} />
			<div
				style={{
					display: "inline-flex",
					justifyContent: "space-between",
					alignItems: "center",
					paddingInline: "1.5rem",
					paddingBlock: "0.25rem",
					flex: "0 0 3rem",
				}}
			>
				<div style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center" }}>
					<Button variant='outlined' onClick={onConfirm}>
						Confirm
					</Button>
					<Button onClick={onReset}>Reset</Button>
				</div>
			</div>
			<Divider sx={{ flex: "0 0 1px", borderWidth: "1px", borderColor: "hsla(248, 46%, 60%, 0.3)" }} />
		</Drawer>
	);
};

export default ManagePanel;
