import React from "react";
import type { FC } from "react";
import type { BarDatum } from "@nivo/bar";

import { $hooks, $ui } from "@shared";

const Bar: FC = () => {
	const { data, isLoading, error } = $hooks.useFetch<BarDatum[], BarDatum[]>("dashboard/ip", [], {
		interval: 30000,
		defaultValue: [],
	});

	return (
		<$ui.loader loading={isLoading} error={error} size='xl'>
			<$ui.charts.bar
				data={data}
				label={(d) => d.data.id as string}
				axisBottom={{ legend: "IP Address", legendOffset: 36 }}
				axisLeft={{ legend: "Flows", legendOffset: -40 }}
			/>
		</$ui.loader>
	);
};

export default Bar;
