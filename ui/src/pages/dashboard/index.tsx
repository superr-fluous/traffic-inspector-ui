import React, { useState } from "react";
import { nanoid } from "nanoid";

import { $ui } from "@shared";
import { $features } from "@features";

// FIXME: import is not code-style compliant...
import type { WidgetModel } from "../../shared/ui/dashboard/model";

/*
 1. Toolbar (Some customization)
 --1.1 Add/delete widget - [x]
 --1.2 Update all (?)
 --1.3 Enhance size selection (grid-range)
 --1.4 Place bookmarked widgets (dashboard only)
 --1.5 Widget manage panel - [x]
 2. Grid (Generic)
 --1.1 Add widget (search empty slots) - [x]
 --1.2 Move cells on widget change ? (?find diff for widget and change grid-row, grid-column?) [x]
 --1.3 "move widgets" switch to enable drag'n'drop movement
 --1.4 Support onLayoutChange 
 --1.5 use a draft for internal state of widgets (to be able to restore) (basically draft is needed to reflect display changes)
 3. Manage panel
 --1.1 Delete popup confirm
 --1.2 Rename ui
 --1.3 Confirm/restore buttons ?
*/

const defaultWidgets: WidgetModel[] = [
	{
		i: nanoid(),
		x: 0,
		y: 0,
		w: 1,
		h: 2,
		name: "Total flows",
		active: true,
		children: <$features.closed.flow.view.total size='xl' />,
	},
	{
		i: nanoid(),
		x: 1,
		y: 0,
		w: 3,
		h: 2,
		name: "Flows over time",
		active: true,
		children: <$features.closed.flow.view.chart.totalOverTime />,
	},
	{
		i: nanoid(),
		x: 0,
		y: 2,
		w: 1,
		h: 2,
		name: "Protocols",
		active: true,
		children: <$features.open.protocol.view.chart.top />,
	},
	{
		i: nanoid(),
		x: 1,
		y: 2,
		w: 1,
		h: 2,
		name: "Countries",
		active: true,
		children: <$features.open.country.view.chart.top />,
	},
	{
		i: nanoid(),
		x: 2,
		y: 2,
		w: 1,
		h: 2,
		name: "IP Addresses",
		active: true,
		children: <$features.open.ip.view.chart.top />,
	},
	{
		i: nanoid(),
		x: 3,
		y: 2,
		w: 1,
		h: 2,
		name: "Categories",
		active: true,
		children: <$features.open.category.view.chart.top />,
	},
];

const newWidget = (size: { w: number; h: number }): WidgetModel => ({
	...size,
	x: Infinity,
	y: Infinity,
	i: nanoid(),
	name: "New widget",
	active: true,
	children: "New widget",
});

const Dashboard = () => {
	const [widgets, setWidgets] = useState(defaultWidgets);

	const addWidget = (size: { w: number; h: number }) => {
		setWidgets([...widgets, newWidget(size)]);
	};

	const deleteWidget = (id: WidgetModel["i"]) => {
		setWidgets((current) => current.filter((widget) => widget.i !== id));
	};

	const enableWidget = (id: WidgetModel["i"], enable: WidgetModel["active"]) => {
		setWidgets((current) => current.map((widget) => (widget.i === id ? { ...widget, active: enable } : widget)));
	};

	return (
		<$ui.dashboard widgets={widgets} onAddWidget={addWidget} onDeleteWidget={deleteWidget} onEnable={enableWidget} />
	);
};

export default Dashboard;
