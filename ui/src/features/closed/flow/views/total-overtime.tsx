import React from "react";
import type { FC } from "react";
import type { LineSeries } from "@nivo/line";

import { $hooks, $ui } from "@shared";

const Line: FC = () => {
	const { data, isLoading, error } = $hooks.useFetch<LineSeries[], LineSeries[]>("dashboard/total", [], {
		interval: 30000,
		defaultValue: [],
	});

	return (
		<$ui.loader loading={isLoading} error={error} size='xl'>
			<$ui.charts.line
				data={data}
				axisBottom={{ legend: "Time", legendOffset: 36 }}
				axisLeft={{ legend: "Flows", legendOffset: -40 }}
			/>
		</$ui.loader>
	);
};

export default Line;
