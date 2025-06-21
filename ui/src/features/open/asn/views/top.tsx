import React from "react";
import type { FC } from "react";

import { $ui } from "@shared";

const Pie: FC = () => {
	// fetch
	const mock = [
		{ id: "AS15169", value: 400 },
		{ id: "AS13335", value: 350 },
		{ id: "AS16509", value: 300 },
	];

	return (
		<$ui.widget header="Top ASN" size={{ w: "100%" }}>
			<$ui.charts.pie data={mock} />
		</$ui.widget>
	);
};

export default Pie;
