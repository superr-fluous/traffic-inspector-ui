import React, { useState } from "react";
import type { Layout } from "react-grid-layout";

import { $ui } from "@shared";

// FIXME: import is not code-style compliant...
import type { PulledWidgetModel } from "../../shared/ui/dashboard/model";

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

const Dashboard = () => {
	const [widgets] = useState<PulledWidgetModel[]>([]);
	const [layout] = useState<Layout[]>([{ i: "1", x: 0, y: 0, w: 2, h: 2 }]);

	return <$ui.dashboard mode='bucket' layout={layout} widgets={widgets} onChange={() => {}} />;
};

export default Dashboard;
