import React, { useState } from "react";
import { nanoid } from "nanoid";

import { $ui } from "@shared";
import { $features } from "@features";

// FIXME: import is not code-style compliant...
import type { EmptySlot, WidgetModel } from "../../shared/ui/dashboard/model";

/*
 1. Toolbar (Some customization)
 --1.1 Add/delete widget - [x]
 --1.2 Update all
 --1.3 Enhance size selection (grid-range)
 --1.4 Place bookmarked widgets (dashboard only)
 --1.5 Widget manage panel - [x]
 2. Grid (Generic)
 --1.1 Add widget (search empty slots) - [x]
 --1.2 Move cells on widget change ? (?find diff for widget and change grid-row, grid-column?)
*/

const defaultWidgets: WidgetModel[] = [
	{
		id: nanoid(),
		x: 0,
		y: 0,
		w: 1,
		h: 2,
		name: "Total flows",
		active: true,
		children: <$features.closed.flow.view.total size='xl' />,
	},
	{
		id: nanoid(),
		x: 1,
		y: 0,
		w: 3,
		h: 2,
		name: "Flows over time",
		active: true,
		children: <$features.closed.flow.view.chart.totalOverTime />,
	},
	{
		id: nanoid(),
		x: 0,
		y: 2,
		w: 1,
		h: 2,
		name: "Protocols",
		active: true,
		children: <$features.open.protocol.view.chart.top />,
	},
	{
		id: nanoid(),
		x: 1,
		y: 2,
		w: 1,
		h: 2,
		name: "Countries",
		active: true,
		children: <$features.open.country.view.chart.top />,
	},
	{
		id: nanoid(),
		x: 2,
		y: 2,
		w: 1,
		h: 2,
		name: "IP Addresses",
		active: true,
		children: <$features.open.ip.view.chart.top />,
	},
	{
		id: nanoid(),
		x: 3,
		y: 2,
		w: 1,
		h: 2,
		name: "Categories",
		active: true,
		children: <$features.open.category.view.chart.top />,
	},
];

const newWidget = (slot: EmptySlot): WidgetModel => ({
	...slot,
	id: nanoid(),
	name: "New widget",
	active: true,
	children: "New widget",
});

const Dashboard = () => {
	const [widgets, setWidgets] = useState(defaultWidgets);

	const addWidget = (slot: EmptySlot) => {
		setWidgets([...widgets, newWidget(slot)]);
	};

	const deleteWidget = (id: WidgetModel["id"]) => {
		setWidgets((current) => current.filter((widget) => widget.id !== id));
	};

	return <$ui.dashboard widgets={widgets} onAddWidget={addWidget} onDeleteWidget={deleteWidget} />;
};

export default Dashboard;
