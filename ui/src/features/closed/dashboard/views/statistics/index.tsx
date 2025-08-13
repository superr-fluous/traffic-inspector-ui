import React, { useEffect, useRef, useState } from "react";

import { $helpers, $ui } from "@shared";

import _endpoint from "../../endpoint";

import Toolbar from "./widgets/toolbar";
import ManagePanel from "./widgets/manage-panel";

import styles from "../shared/styles.module.css";

const Statistics = () => {
	const [showDelete, setShowDelete] = useState(false);
	const [showEmptySlots, setShowEmptySlots] = useState(false);
	const [showManagePanel, setShowManagePanel] = useState(false);

	const [layout, { isLoading, error, lastAdded }, layoutAPI] = _endpoint.adapters.react.useLayout("dashboard");

	const prevLayoutSize = useRef(0);

	const cancelToolbarAction = () => {
		setShowDelete(false);
		setShowEmptySlots(false);
	};

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

	useEffect(() => {
		if (layout.length === prevLayoutSize.current + 1 && lastAdded !== null) {
			// widget added
			document.getElementById(lastAdded)?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
		}

		return () => {
			prevLayoutSize.current = layout.length;
		};
	}, [layout]);

	return (
		<$ui.loader className={styles.wrapper} loading={isLoading} error={error}>
			<ManagePanel
				open={showManagePanel}
				widgets={widgets}
				onAdd={layoutAPI.addItem}
				onClose={() => setShowManagePanel(false)}
				onConfirm={confirmChanges}
				onDelete={layoutAPI.deleteItem}
				onEnable={layoutAPI.toggleItem}
				onReset={layoutAPI.reset}
				onChangeWidgetName={layoutAPI.renameItem}
				onToggleBookmark={layoutAPI.toggleItem}
			/>
			<Toolbar
				addMode={showEmptySlots}
				onCancel={cancelToolbarAction}
				onManageWidgets={() => setShowManagePanel(true)}
				onSelectWidgetSize={layoutAPI.addItem}
			/>

			<$ui.scrollable
				className={$helpers.clsx(styles["grid-layout-wrapper"], showDelete && styles["show-delete-overlay"])}
			>
				<$ui.sinks.widgetPanel layout={layout} widgets={renderedWidgets} />
			</$ui.scrollable>
		</$ui.loader>
	);
};

export default Statistics;
