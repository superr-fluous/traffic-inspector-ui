import React from "react";

import { $features } from "@features";
import { $ui } from "@shared";

const Page = () => (
	<>
		<$ui.pageHeader>Network Flows</$ui.pageHeader>
		<$features.closed.flow.view.table />
	</>
);

export default Page;
