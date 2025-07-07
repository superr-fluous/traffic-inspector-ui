import React from "react";
import type { FC } from "react";
import type { MayHaveLabel } from "@nivo/pie";

import { $hooks, $ui } from "@shared";

const Pie: FC = () => {
	const { data, isLoading, error } = $hooks.useFetch<MayHaveLabel[], MayHaveLabel[]>("dashboard/proto", [], {
		interval: 30000,
		defaultValue: [],
	});

	return (
		<$ui.loader loading={isLoading} error={error} size='xl'>
			<$ui.charts.pie data={data} />
		</$ui.loader>
	);
};

export default Pie;
