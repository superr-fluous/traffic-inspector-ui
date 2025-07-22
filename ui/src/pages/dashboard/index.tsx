import React, { useState } from "react";

import { $ui } from "@shared";

// FIXME: import is not code-style compliant...
import type { WidgetModel } from "../../shared/ui/dashboard/model";

const Dashboard = () => {
	const [widgets, setWidgets] = useState<WidgetModel[]>([
		{ i: "1", x: 0, y: 0, w: 2, h: 2, active: true, config: {}, name: "test" },
	]);

	return <$ui.dashboard widgets={widgets} onChange={() => {}} />;
};

export default Dashboard;
