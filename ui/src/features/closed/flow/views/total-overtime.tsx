import React from "react";
import type { FC } from "react";
import type { LineSeries } from "@nivo/line";

import { $hooks, $ui } from "@shared";
import { endpoint as dashboardEndpoint } from "@features/closed/dashboard";
import { GenericWidgetPreviewProps, GenericWidgetViewProps } from "@features/open/widget/model";

const Line: FC<GenericWidgetViewProps | GenericWidgetPreviewProps> = (props) => {
	const { data, isLoading, error } = $hooks.useFetch(
		() => {
			if ("i" in props) {
				return dashboardEndpoint.fetch.data(props.i);
			} else {
				return dashboardEndpoint.fetch.preview(props);
			}
		},
		[],
		{
			interval: 30000,
			defaultValue: [],
		}
	);

	return (
		<$ui.loader loading={isLoading} error={error} size='xl'>
			<$ui.charts.line
				data={data as LineSeries[]}
				axisBottom={{ legend: "Time", legendOffset: 36 }}
				axisLeft={{ legend: "Flows", legendOffset: -40 }}
			/>
		</$ui.loader>
	);
};

export default Line;
