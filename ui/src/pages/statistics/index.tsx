import React, { useState } from "react";
import type { Layout } from "react-grid-layout";

import { $ui } from "@shared";

// FIXME: import is not code-style compliant...
import type { WidgetModel } from "../../shared/ui/dashboard/model";

const Dashboard = () => {
	const [widgets] = useState<WidgetModel[]>([]);
	const [layout] = useState<Layout[]>([]);

	return <$ui.dashboard mode='origin' layout={layout} widgets={widgets} onChange={() => {}} />;
};

export default Dashboard;
