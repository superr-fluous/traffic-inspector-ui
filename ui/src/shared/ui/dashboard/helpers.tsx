import { nanoid } from "nanoid";
import type { ComponentType } from "react";
import type { Layout } from "react-grid-layout";

import { $features } from "@features";
import type { Defined } from "@shared/helpers/types";

import type { GenericWidgetViewProps, WidgetConfig } from "./model";

// TODO: refactor -> should be default export with all helpers and then: import _helpers from "*/**"

export const makeLayout = (size: { w: number; h: number }): Layout => ({
	...size,
	x: Infinity,
	y: Infinity,
	i: nanoid(),
});

const widgetVisualMapper = {
	ASN: {
		bar: $features.open.asn.view.chart.top,
		pie: $features.open.asn.view.chart.top,
		line: $features.open.asn.view.chart.top,
	},
	CATEGORY: {
		bar: $features.open.category.view.chart.top,
		pie: $features.open.category.view.chart.top,
		line: $features.open.category.view.chart.top,
	},
	COUNTRY: {
		bar: $features.open.country.view.chart.top,
		pie: $features.open.country.view.chart.top,
		line: $features.open.country.view.chart.top,
	},
	IP: {
		bar: $features.open.ip.view.chart.top,
		pie: $features.open.ip.view.chart.top,
		line: $features.open.ip.view.chart.top,
	},
	OS: {
		bar: $features.open.os.view.chart.top,
		pie: $features.open.os.view.chart.top,
		line: $features.open.os.view.chart.top,
	},
	PROTOCOL: {
		bar: $features.open.protocol.view.chart.top,
		pie: $features.open.protocol.view.chart.top,
		line: $features.open.protocol.view.chart.top,
	},
	TOTAL: {
		sensor: $features.closed.flow.view.total,
		line: $features.closed.flow.view.chart.totalOverTime,
	},
} as Record<
	Defined<WidgetConfig["dataInfo"]>,
	Partial<Record<Defined<WidgetConfig["dataVisual"]>, ComponentType<GenericWidgetViewProps>>>
>;

export const getWidgetVisual = (config: WidgetConfig) => {
	if (config.dataInfo === undefined || config.dataVisual === undefined) {
		return null;
	}

	return widgetVisualMapper[config.dataInfo][config.dataVisual];
};

export const getDataInfoOptions = (dataSource: WidgetConfig["dataSource"]) => {
	switch (dataSource) {
		case "flows":
			return ["ASN", "CATEGORY", "COUNTRY", "IP", "OS", "PROTOCOL", "TOTAL"];
		case "system":
			return [];
		default:
			return [];
	}
};

export const getDataVisualOptions = (
	dataInfo: WidgetConfig["dataInfo"]
): Array<Defined<WidgetConfig["dataVisual"]>> => {
	if (dataInfo === undefined) {
		return [];
	}

	if (dataInfo === "TOTAL") {
		return ["line", "sensor"];
	}

	return ["line", "pie", "bar"];
};
