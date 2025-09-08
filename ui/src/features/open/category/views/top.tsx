import React from "react";
import type { FC } from "react";
import type { MayHaveLabel } from "@nivo/pie";

import { $hooks, $ui } from "@shared";
import { endpoint as dashboardEndpoint } from "@features/closed/dashboard";
import { GenericWidgetPreviewProps, GenericWidgetViewProps } from "@features/open/widget/model";

const Pie: FC<GenericWidgetViewProps | GenericWidgetPreviewProps> = (props) => {
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
			<$ui.charts.pie data={data as MayHaveLabel[]} />
		</$ui.loader>
	);
};

export default Pie;
