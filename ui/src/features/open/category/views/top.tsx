import React from "react";
import type { FC } from "react";

import { $ui } from "@shared";

const Pie: FC = ({ }) => {
	// fetch;
	const mock = [
		{ id: "Web", label: "Web", value: 45 },
		{ id: "Streaming", label: "Streaming", value: 25 },
		{ id: "Gaming", label: "Gaming", value: 15 },
		{ id: "Other", label: "Other", value: 15 },
	];

	return (
		<$ui.widget header="Top Categories" size={{ w: "100%" }}>
			<$ui.charts.pie data={mock} />
		</$ui.widget>
	);
};

export default Pie;
