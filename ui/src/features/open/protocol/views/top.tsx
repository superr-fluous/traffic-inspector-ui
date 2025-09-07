import React from "react";
import type { FC } from "react";
import type { MayHaveLabel } from "@nivo/pie";

import { $hooks, $ui } from "@shared";
import { ComputedDatum } from "@nivo/bar";

const mock = [
	{
		label: "HTTP",
		value: 13211,
		id: "http",
	},
	{
		label: "DNS",
		value: 2121,
		id: "dns",
	},
	{
		label: "ARR",
		value: 121312,
		id: "arp",
	},
];

const Pie: FC = ({}) => {
	// const { data, isLoading, error } = $hooks.useFetch<MayHaveLabel[], MayHaveLabel[]>("dashboard/proto", [], {
	// 	interval: 30000,
	// 	defaultValue: [],
	// });

	return (
		<$ui.loader loading={false} error={null} size='xl'>
			<$ui.charts.pie data={mock} />
		</$ui.loader>
	);
};

export default Pie;
