import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { FC, ReactNode } from "react";

import { $ui, $helpers } from "@shared";

import Toolbar from "./ui/toolbar";
import { calcEmptySlots } from "./helpers";
import type { EmptySlot, Widget } from "./model";

import styles from "./styles.module.css";

const ROW_CELLS = 4;

interface Props {
	widgets: Widget[];
	onAddWidget: (slot: EmptySlot) => void;
	onDeleteWidget: (id: Widget["id"]) => void;
}

const Dashboard: FC<Props> = ({ widgets, onAddWidget, onDeleteWidget }) => {
	const [internalWidgets, setInternalWidgets] = useState(widgets);
	const [showEmptySlots, setShowEmptySlots] = useState(false);
	const [showDelete, setShowDelete] = useState(false);

	const gridRef = useRef<HTMLDivElement>(null);
	const emptySlots = useRef<EmptySlot[]>([]);
	const EmptyTiles = useRef<ReactNode[]>([]);

	const cancelToolbarAction = () => {
		setShowDelete(false);
		setShowEmptySlots(false);
	};

	const deleteWidget = (id: Widget["id"]) => {
		onDeleteWidget(id);
		setShowDelete(false);
	};

	const addWidget = (slot: EmptySlot) => {
		setShowEmptySlots(false);
		onAddWidget(slot);
	};

	const selectWidgetSize = (size: { w: number; h: number }) => {
		emptySlots.current = calcEmptySlots(internalWidgets, size, ROW_CELLS);
		EmptyTiles.current = emptySlots.current.map((slot) => (
			<div
				style={{ gridRow: `${slot.y + 1} / span ${slot.h}`, gridColumn: `${slot.x + 1} / span ${slot.w}` }}
				className={$helpers.clsx(styles.tile, styles.empty)}
				data-slot={slot}
				onClick={() => addWidget(slot)}
				key={`${slot.x}x${slot.y}`}
				id='empty-tile'
			>
				Empty
			</div>
		));

		setShowEmptySlots(true);
	};

	useLayoutEffect(() => {
		setInternalWidgets(widgets);
		console.log("set internal widgets");
	}, [widgets]);

	useEffect(() => {
		if (showEmptySlots && gridRef.current !== null) {
			document.getElementById("empty-tile")?.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
		}
	}, [showEmptySlots]);

	const Tiles = useMemo(
		() =>
			internalWidgets.map((widget) => (
				<div
					style={{ gridRow: `${widget.y + 1} / span ${widget.h}`, gridColumn: `${widget.x + 1} / span ${widget.w}` }}
					className={$helpers.clsx(styles.tile, showDelete && styles.delete)}
					key={widget.id}
					onClick={showDelete ? () => deleteWidget(widget.id) : undefined}
				>
					{widget.children}
				</div>
			)),
		[internalWidgets, showDelete]
	);

	return (
		<div className={styles.wrapper}>
			<Toolbar
				addMode={showEmptySlots}
				deleteMode={showDelete}
				onCancel={cancelToolbarAction}
				onDelete={() => setShowDelete(true)}
				onSelectWidgetSize={selectWidgetSize}
			/>

			<$ui.scrollable ref={gridRef} className={styles["grid-layout"]}>
				{Tiles}
				{showEmptySlots && EmptyTiles.current}
			</$ui.scrollable>
		</div>
	);
};

export default Dashboard;
