import React from "react";
import type { FC } from "react";

import { $ui } from "@shared";

const Pie: FC = () => {
	// fetch;
	const mock = [
		{ id: "US", label: "US", value: 500 },
		{ id: "DE", label: "DE", value: 300 },
		{ id: "FR", label: "FR", value: 200 },
		{ id: "CN", label: "CN", value: 150 },
		{ id: "IN", label: "IN", value: 100 },
	];

	return (
		<$ui.widget header="Top Countries" size={{ w: "100%" }}>
			<$ui.charts.pie data={mock} />
		</$ui.widget>
	);
};

export default Pie;
