import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Layout } from "react-grid-layout";

import { $ui, $helpers } from "@shared";

import Toolbar from "./ui/toolbar";
import ManagePanel from "./ui/manage-panel";

import { makeLayout } from "./helpers";

import type { ManagePanelProps } from "./ui/manage-panel";
import type { PulledWidgetModel, WidgetConfig, WidgetModel } from "./model";

import styles from "./styles.module.css";
import { Features } from "@features";

interface Props<T extends "origin" | "bucket"> {
	layout: Layout[];
	onChange: (widgets: WidgetModel[]) => void;
	mode: T;
}

/*
 idk... in general this is fine, rerender overhead shouldn't be too much if optimized here and there, maybe it'll be fine even without the optimization
 gridstackjs is poorly adjustable for react, having to balance both GridStack internal state and translate it to React's state is too finicky
 kinda preffered DIY version, maybe should move to it eventually if no-drag'n'drop is okay 
*/
const Dashboard = <T extends "origin" | "bucket">({ layout, mode, onChange }: Props<T>) => {
	const [showDelete, setShowDelete] = useState(false);
	const [showEmptySlots, setShowEmptySlots] = useState(false);
	const [showManagePanel, setShowManagePanel] = useState(false);

	const [localLayout, setLocalLayout] = useState<Layout[]>(layout);
	const lastAddedWidgetId = useRef<WidgetModel["i"]>(null);

	const cancelToolbarAction = () => {
		setShowDelete(false);
		setShowEmptySlots(false);
	};

	// const enableWidget = (id: WidgetModel["i"], enabled: WidgetModel["active"]) => {
	// 	setLocalWidgets((current) => current.map((w) => (w.i === id ? { ...w, active: enabled } : w)));
	// };

	// const deleteWidget = (id: WidgetModel["i"]) => {
	// 	setLocalWidgets((current) => current.filter((w) => w.i !== id));
	// };

	// const addWidget = (size: { w: number; h: number }, signalChange = false) => {
	// 	const widgetLayout = makeLayout(size);
	// 	const widget = { i: widgetLayout.i, config: {}, active: true, bookmarked: false };

	// 	const widgets = [...localWidgets, widget] as typeof localWidgets;

	// 	setLocalWidgets(widgets);
	// 	setLocalLayout([...localLayout, widgetLayout]);

	// 	lastAddedWidgetId.current = widget.i;

	// 	if (signalChange) {
	// 		onChange(widgets);
	// 	}
	// };

	// const confirmChanges = () => {
	// 	setShowManagePanel(false);
	// 	onChange(localWidgets);
	// };

	// const applyWidgetConfig = (config: WidgetConfig, id: WidgetModel["i"]) => {
	// 	const widgets = localWidgets.map((w) => (w.i === id ? { ...w, config } : w));
	// 	setLocalWidgets(widgets);
	// 	onChange(widgets);
	// };

	// const chnageWidgetName = (id: WidgetModel["i"], name: WidgetModel["name"]) => {
	// 	const widgets = localWidgets.map((w) => (w.i === id ? { ...w, name } : w));
	// 	setLocalWidgets(widgets);
	// 	onChange(widgets);
	// };

	// const toggleBookmark = (id: WidgetModel["i"], bookmarked: WidgetModel["bookmarked"]) => {
	// 	const widgets = localWidgets.map((w) => (w.i === id ? { ...w, bookmarked } : w));
	// 	setLocalWidgets(widgets);
	// 	onChange(widgets);
	// };

	useEffect(() => {
		setLocalLayout(layout);
	}, [layout]);

	// useEffect(() => {
	// 	if (localWidgets.length === prevWidgetsSize.current + 1 && lastAddedWidgetId.current !== null) {
	// 		// widget added
	// 		document
	// 			.getElementById(lastAddedWidgetId.current)
	// 			?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
	// 	}

	// 	return () => {
	// 		prevWidgetsSize.current = localWidgets.length;
	// 	};
	// }, [localWidgets]);

	const widgets = useMemo(
		() =>
			localLayout.reduce(
				(_widgets, item) => {
					if (item.active) {
						_widgets.push(item.i);
					}

					return _widgets;
				},
				[] as Array<Features["closed"]["widget"]["default"]["i"]>
			),
		[localLayout]
	);

	const inactiveWidgetsL = widgets.length - displayWidgets.length;

	return (
		<div className={styles.wrapper}>
			<ManagePanel
				open={showManagePanel}
				widgets={localWidgets as ManagePanelProps<typeof mode>["widgets"]}
				mode={mode}
				onAdd={addWidget}
				onClose={() => setShowManagePanel(false)}
				onConfirm={confirmChanges}
				onDelete={deleteWidget}
				onEnable={enableWidget}
				onReset={() => setLocalWidgets(widgets)}
				onChangeWidgetName={chnageWidgetName}
				onToggleBookmark={toggleBookmark}
			/>
			<Toolbar
				addMode={showEmptySlots}
				unassignedWidgetsNum={inactiveWidgetsL}
				mode={mode}
				onCancel={cancelToolbarAction}
				onManageWidgets={() => setShowManagePanel(true)}
				onSelectWidgetSize={addWidget}
			/>

			<$ui.scrollable
				className={$helpers.clsx(styles["grid-layout-wrapper"], showDelete && styles["show-delete-overlay"])}
			>
				<$ui.sinks.widgetPanel layout={localLayout} widgets={displayWidgets} />
			</$ui.scrollable>
		</div>
	);
};

export default Dashboard;
