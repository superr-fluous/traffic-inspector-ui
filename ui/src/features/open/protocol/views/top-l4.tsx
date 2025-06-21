import React from "react";
import type { FC } from "react";

import { $ui } from "@shared";

const Pie: FC = () => {
	const mock = [
		{ id: "TCP", label: "TCP", value: 60 },
		{ id: "UDP", label: "UDP", value: 35 },
		{ id: "SCTP", label: "SCTP", value: 5 },
	];

	return (
		<$ui.widget header="Top L4 Protocols" size={{ w: "100%" }}>
			<$ui.charts.pie data={mock} />
		</$ui.widget>
	);
};

export default Pie;
