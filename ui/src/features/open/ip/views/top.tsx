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
		<$ui.widget loading={isLoading} error={error} header='Top IP Addresses' size={{ w: "100%" }}>
			<$ui.charts.bar
				data={data}
				label={(d) => d.data.id as string}
				axisBottom={{ legend: "IP Address", legendOffset: 36 }}
				axisLeft={{ legend: "Flows", legendOffset: -40 }}
			/>
		</$ui.widget>
	);
};

export default Bar;
