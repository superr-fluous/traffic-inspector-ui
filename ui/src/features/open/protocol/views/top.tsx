import React from "react";
import type { FC } from "react";
import type { MayHaveLabel } from "@nivo/pie";

import { $hooks, $ui } from "@shared";

const Pie: FC = ({}) => {
	const { data, isLoading, error } = $hooks.useFetch<MayHaveLabel[], MayHaveLabel[]>("dashboard/proto", [], {
		interval: 30000,
		defaultValue: [],
	});

	return (
		<$ui.widget loading={isLoading} error={error} header='Top Protocols' size={{ w: "100%" }}>
			<$ui.charts.pie data={data} />
		</$ui.widget>
	);
};

export default Pie;
