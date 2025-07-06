import React, { useState } from "react";

import { $ui } from "@shared";

import type { EmptySlot, Widget } from "../../shared/ui/dashboard/model";
import { $features } from "@features";
import { nanoid } from "nanoid";

/*
 1. Toolbar (Some customization)
 --1.1 Add/delete widget
 --1.2 Update all
 --1.3 Enhance size selection (grid-range)
 --1.4 Place bookmarked widgets (dashboard only)
 2. Grid (Generic)
 --1.1 Add widget (search empty slots) - [x]
 --
*/

const defaultWidgets: Widget[] = [
	{ id: nanoid(), x: 0, y: 0, w: 1, h: 2, children: <$features.closed.flow.view.total size='xl' /> },
	{ id: nanoid(), x: 1, y: 0, w: 3, h: 2, children: <$features.closed.flow.view.chart.totalOverTime /> },
	{ id: nanoid(), x: 0, y: 2, w: 1, h: 2, children: <$features.open.protocol.view.chart.top /> },
	{ id: nanoid(), x: 1, y: 2, w: 1, h: 2, children: <$features.open.country.view.chart.top /> },
	{ id: nanoid(), x: 2, y: 2, w: 1, h: 2, children: <$features.open.ip.view.chart.top /> },
	{ id: nanoid(), x: 3, y: 2, w: 1, h: 2, children: <$features.open.category.view.chart.top /> },
];

const newWidget = (slot: EmptySlot): Widget => ({ ...slot, id: nanoid(), children: "New widget" });

const Dashboard = () => {
	const [widgets, setWidgets] = useState(defaultWidgets);

	const addWidget = (slot: EmptySlot) => {
		setWidgets([...widgets, newWidget(slot)]);
	};

	const deleteWidget = (id: Widget["id"]) => {
		setWidgets((current) => current.filter((widget) => widget.id !== id));
	};

	return <$ui.dashboard widgets={widgets} onAddWidget={addWidget} onDeleteWidget={deleteWidget} />;
};

export default Dashboard;
