import React, { useEffect, useRef, useState } from "react";

import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

import AddIcon from "@mui/icons-material/Add";
import TextFormat from "@mui/icons-material/TextFormat";
import DeleteForever from "@mui/icons-material/DeleteForever";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

import type { PulledWidgetModel, WidgetModel } from "../model";

export interface ManagePanelProps<T extends "bucket" | "origin"> {
	open: boolean;
	mode: T;
	widgets: Array<T extends "bucket" ? PulledWidgetModel : WidgetModel>;
	onReset: VoidFunction;
	onClose: VoidFunction;
	onConfirm: VoidFunction;
	onAdd: (size: { w: number; h: number }) => void;
	onDelete: (id: WidgetModel["i"]) => void;
	onEnable: (id: WidgetModel["i"], enabled: WidgetModel["active"]) => void;
	onChangeWidgetName: (id: WidgetModel["i"], name: WidgetModel["name"]) => void;
	onToggleBookmark: (id: WidgetModel["i"], bookmarked: WidgetModel["bookmarked"]) => void;
}

const ManagePanel = <T extends "bucket" | "origin">({
	open,
	mode,
	widgets,
	onEnable,
	onAdd,
	onClose,
	onConfirm,
	onDelete,
	onChangeWidgetName,
	onReset,
	onToggleBookmark,
}: ManagePanelProps<T>) => {
	const [showSizeMenu, setShowSizeMenu] = useState(false);
	const [editWidgetName, setEditWidgetName] = useState<WidgetModel["i"] | null>(null);

	const menuAnchor = useRef<HTMLButtonElement>(null);
	const highlightTimeout = useRef<NodeJS.Timeout>(null);

	const addHighlight = (id: WidgetModel["i"]) => {
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

	const removeHighlight = (id: WidgetModel["i"]) => {
		const elem = document.getElementById(id);

		if (elem !== null) {
			elem.classList.remove("highlight");
		}
		highlightTimeout.current = null;
	};

	const changeWidgetName = (id: WidgetModel["i"]) => {
		setEditWidgetName(id);
	};

	const confirmWidgetName = () => {
		const name = (document.getElementById(`name-textfield-${editWidgetName}`) as HTMLInputElement).value;
		onChangeWidgetName(editWidgetName!, name);
		setEditWidgetName(null);
	};

	const selectWidgetSize = (size: { w: number; h: number }) => {
		setShowSizeMenu(false);
		onAdd(size);
	};

	const toggleBookmark = (id: WidgetModel["i"], current: WidgetModel["bookmarked"]) => {
		onToggleBookmark(id, !current);
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
				<Button ref={menuAnchor} startIcon={<AddIcon />} onClick={() => setShowSizeMenu(true)}>
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
									{mode === "origin" && (
										<IconButton color='primary' onClick={() => toggleBookmark(widget.i, widget.bookmarked)}>
											{widget.bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
										</IconButton>
									)}
									{mode === "origin" &&
										(editWidgetName === widget.i ? (
											<IconButton color='primary' onClick={confirmWidgetName}>
												<DoneOutlineIcon />
											</IconButton>
										) : (
											<IconButton color='primary' onClick={() => changeWidgetName(widget.i)}>
												<TextFormat />
											</IconButton>
										))}
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
