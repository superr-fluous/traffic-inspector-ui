import React, { useEffect, useState } from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import type { FC } from "react";

import { $ui, $helpers } from "@shared";

import Widget from "./ui/widget";
import Toolbar from "./ui/toolbar";
import ManagePanel from "./ui/manage-panel";

import type { WidgetModel } from "./model";

import styles from "./styles.module.css";

const Grid = WidthProvider(GridLayout);

interface Props {
	widgets: WidgetModel[];
	onAddWidget: (size: { w: number; h: number }) => void;
	onDeleteWidget: (id: WidgetModel["i"]) => void;
	onEnable: (id: WidgetModel["i"], enable: boolean) => void;
}

/*
 idk... in general this is fine, rerender overhead shouldn't be too much if optimized here and there, maybe it'll be fine even without the optimization
 gridstackjs is poorly adjustable for react, having to balance both GridStack internal state and translate it to React's state is too finicky
 kinda preffered DIY version, maybe should move to it eventually if no-drag'n'drop is okay 
*/
const Dashboard: FC<Props> = ({ widgets, onAddWidget, onDeleteWidget, onEnable }) => {
	const [showDelete, setShowDelete] = useState(false);
	const [displayWidget, setDisplayWidgets] = useState<WidgetModel[]>([]); // this empty default state is crucial, since we need a rerender in order to extract widgets container for react portal
	const [showEmptySlots, setShowEmptySlots] = useState(false);
	const [showManagePanel, setShowManagePanel] = useState(false);

	const cancelToolbarAction = () => {
		setShowDelete(false);
		setShowEmptySlots(false);
	};

	useEffect(() => {
		setDisplayWidgets(widgets.filter((w) => w.active));
	}, [widgets]);

	return (
		<div className={styles.wrapper}>
			<ManagePanel
				open={showManagePanel}
				onClose={() => setShowManagePanel(false)}
				widgets={widgets}
				onEnable={onEnable}
				onDelete={onDeleteWidget}
			/>
			<Toolbar
				addMode={showEmptySlots}
				onCancel={cancelToolbarAction}
				onManageWidgets={() => setShowManagePanel(true)}
				onSelectWidgetSize={onAddWidget}
			/>

			<$ui.scrollable
				className={$helpers.clsx(styles["grid-layout-wrapper"], showDelete && styles["show-delete-overlay"])}
			>
				<Grid
					cols={4}
					rowHeight={192}
					layout={displayWidget}
					margin={[12, 12]}
					isBounded
					style={{
						position: "relative",
					}} /* actually 🤡 for making me specify that with react-grid-item having a position: absolute */
				>
					{displayWidget.map((widget) => (
						<Widget
							key={widget.i}
							id={widget.i}
							widget={widget}
							onClick={showDelete ? () => onDeleteWidget(widget.i) : undefined}
						/>
					))}
				</Grid>
			</$ui.scrollable>
		</div>
	);
};

export default Dashboard;
