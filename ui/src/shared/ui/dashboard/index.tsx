import React, { useEffect, useMemo, useRef, useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import type { FC } from "react";

import { $ui, $helpers } from "@shared";

import Widget from "./ui/widget";
import Toolbar from "./ui/toolbar";
import ManagePanel from "./ui/manage-panel";

import type { WidgetConfig, WidgetModel } from "./model";

import styles from "./styles.module.css";
import { makeWidget } from "./helpers";
import { Button } from "@mui/material";

const Grid = WidthProvider(GridLayout);

interface Props {
	widgets: WidgetModel[];
	onChange: (widgets: WidgetModel[]) => void;
}

/*
 idk... in general this is fine, rerender overhead shouldn't be too much if optimized here and there, maybe it'll be fine even without the optimization
 gridstackjs is poorly adjustable for react, having to balance both GridStack internal state and translate it to React's state is too finicky
 kinda preffered DIY version, maybe should move to it eventually if no-drag'n'drop is okay 
*/
const Dashboard: FC<Props> = ({ widgets, onChange }) => {
	const [showDelete, setShowDelete] = useState(false);
	const [showEmptySlots, setShowEmptySlots] = useState(false);
	const [showManagePanel, setShowManagePanel] = useState(false);
	const [internalWidgets, setInternalWidgets] = useState<WidgetModel[]>(widgets);

	const prevWidgetsSize = useRef<number>(internalWidgets.length);
	const lastAddedWidgetId = useRef<WidgetModel["i"]>(null);

	const cancelToolbarAction = () => {
		setShowDelete(false);
		setShowEmptySlots(false);
	};

	const enableWidget = (id: WidgetModel["i"], enabled: WidgetModel["active"]) => {
		setInternalWidgets((current) => current.map((w) => (w.i === id ? { ...w, active: enabled } : w)));
	};

	const deleteWidget = (id: WidgetModel["i"]) => {
		setInternalWidgets((current) => current.filter((w) => w.i !== id));
	};

	const addWidget = (size: { w: number; h: number }, signalChange = false) => {
		const widget = makeWidget(size);
		const widgets = [...internalWidgets, widget];

		setInternalWidgets(widgets);
		lastAddedWidgetId.current = widget.i;

		if (signalChange) {
			onChange(widgets);
		}
	};

	const confirmChanges = () => {
		setShowManagePanel(false);
		onChange(internalWidgets);
	};

	const applyWidgetConfig = (config: WidgetConfig, id: WidgetModel["i"]) => {
		const widgets = internalWidgets.map((w) => (w.i === id ? { ...w, config } : w));
		setInternalWidgets(widgets);
		onChange(widgets);
	};

	useEffect(() => {
		if (internalWidgets.length === prevWidgetsSize.current + 1 && lastAddedWidgetId.current !== null) {
			// widget added
			document
				.getElementById(lastAddedWidgetId.current)
				?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
		}

		return () => {
			prevWidgetsSize.current = internalWidgets.length;
		};
	}, [internalWidgets]);

	const displayWidgets = useMemo(() => internalWidgets.filter((widget) => widget.active), [internalWidgets]);

	return (
		<div className={styles.wrapper}>
			<ManagePanel
				open={showManagePanel}
				widgets={internalWidgets}
				onAdd={addWidget}
				onClose={() => setShowManagePanel(false)}
				onConfirm={confirmChanges}
				onDelete={deleteWidget}
				onEnable={enableWidget}
				onReset={() => setInternalWidgets(widgets)}
			/>
			<Toolbar
				addMode={showEmptySlots}
				onCancel={cancelToolbarAction}
				onManageWidgets={() => setShowManagePanel(true)}
				onSelectWidgetSize={addWidget}
			/>

			<$ui.scrollable
				className={$helpers.clsx(styles["grid-layout-wrapper"], showDelete && styles["show-delete-overlay"])}
			>
				<Grid
					cols={4}
					rowHeight={192}
					layout={displayWidgets}
					margin={[12, 12]}
					isBounded
					isDraggable={false}
					style={{
						position: "relative",
					}} /* actually 🤡 for making me specify that with react-grid-item already having a position: absolute */
				>
					{displayWidgets.map((widget) => (
						<Widget
							key={widget.i}
							id={widget.i}
							widget={widget}
							onConfigure={(config) => applyWidgetConfig(config, widget.i)}
						/>
					))}
				</Grid>
			</$ui.scrollable>
		</div>
	);
};

export default Dashboard;
