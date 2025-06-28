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
		<$ui.widget loading={isLoading} error={error} header='Flows Over Time' size={{ w: "100%" }}>
			<$ui.charts.line
				data={data}
				axisBottom={{ legend: "Time", legendOffset: 36 }}
				axisLeft={{ legend: "Flows", legendOffset: -40 }}
			/>
		</$ui.widget>
	);
};

export default Line;
