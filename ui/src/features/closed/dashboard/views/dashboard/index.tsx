import React, { useState } from "react";

import type { FC } from "react";

import { $ui } from "@shared";

import _endpoint from "../../endpoint";

import Toolbar from "./widgets/toolbar";
import ManagePanel from "./widgets/manage-panel";

import styles from "../shared/styles.module.css";

interface Props {}

const Dashboard: FC<Props> = ({}) => {
	const [showManagePanel, setShowManagePanel] = useState(false);
	const [layout, { isLoading, error }, layoutAPI] = _endpoint.adapters.react.useLayout("dashboard");

	const confirmChanges = () => {
		setShowManagePanel(false);
	};

	const widgets = layout.map((item) => ({
		i: item.i,
		active: item.active,
		name: item.meta.name,
		bookmarked: item.meta.bookmarked,
	}));

	const renderedWidgets = widgets.reduce<string[]>((_widgets, widget) => {
		if (widget.active) {
			_widgets.push(widget.i);
		}
		return _widgets;
	}, []);

	const inactiveWidgetsL = layout.length - widgets.length;
	return (
		<$ui.loader className={styles.wrapper} loading={isLoading} error={error}>
			<ManagePanel
				open={showManagePanel}
				widgets={widgets}
				onClose={() => setShowManagePanel(false)}
				onConfirm={confirmChanges}
				onDelete={layoutAPI.deleteItem}
				onEnable={layoutAPI.toggleItem}
				onReset={layoutAPI.reset}
			/>
			<Toolbar unassignedWidgetsNum={inactiveWidgetsL} onManageWidgets={() => setShowManagePanel(true)} />

			<$ui.scrollable className={styles["grid-layout-wrapper"]}>
				<$ui.sinks.widgetPanel layout={layout} widgets={renderedWidgets} />
			</$ui.scrollable>
		</$ui.loader>
	);
};

export default Dashboard;
