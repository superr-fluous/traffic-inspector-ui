import React from "react";
import type { FC } from "react";

import { $ui } from "@shared";

const Pie: FC = ({ }) => {
	// fetch;
	const mock = [
		{ id: "TCP", label: "TCP", value: 40 },
		{ id: "UDP", label: "UDP", value: 30 },
		{ id: "ICMP", label: "ICMP", value: 15 },
		{ id: "Other", label: "Other", value: 15 },
	];

	return (
		<$ui.widget header="Top Protocols" size={{ w: "100%" }}>
			<$ui.charts.pie data={mock} />
		</$ui.widget>
	);
};

export default Pie;
