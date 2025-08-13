import type { Defined } from "@shared/helpers/types";

// FLAW: circular imports, cant import $features here (?feature-sinks?, ?sinks/features?)
import $ip from "../../ip";
import $os from "../../os";
import $asn from "../../asn";
import $country from "../../country";
import $category from "../../category";
import $protocol from "../../protocol";
import $flow from "../../../closed/flow";

import type { Config } from "../model";

// TODO: refactor -> should be default export with all helpers and then: import _helpers from "*/**"

const widgetVisualMapper = {
	ASN: {
		bar: $asn.view.chart.top,
		pie: $asn.view.chart.top,
		line: $asn.view.chart.top,
	},
	CATEGORY: {
		bar: $category.view.chart.top,
		pie: $category.view.chart.top,
		line: $category.view.chart.top,
	},
	COUNTRY: {
		bar: $country.view.chart.top,
		pie: $country.view.chart.top,
		line: $country.view.chart.top,
	},
	IP: {
		bar: $ip.view.chart.top,
		pie: $ip.view.chart.top,
		line: $ip.view.chart.top,
	},
	OS: {
		bar: $os.view.chart.top,
		pie: $os.view.chart.top,
		line: $os.view.chart.top,
	},
	PROTOCOL: {
		bar: $protocol.view.chart.top,
		pie: $protocol.view.chart.top,
		line: $protocol.view.chart.top,
	},
	TOTAL: {
		sensor: $flow.view.total,
		line: $flow.view.chart.totalOverTime,
	},
};

export const getWidgetVisual = (config: Config) => {
	if (config.info === undefined || config.visual === undefined) {
		return null;
	}

	// @ts-expect-error FIXME
	return widgetVisualMapper[config.info][config.visual];
};

export const getDataInfoOptions = (dataSource: Config["source"]) => {
	switch (dataSource) {
		case "flows":
			return ["ASN", "CATEGORY", "COUNTRY", "IP", "OS", "PROTOCOL", "TOTAL"];
		case "system":
			return [];
		default:
			return [];
	}
};

export const getDataVisualOptions = (info: Config["info"]): Array<Defined<Config["visual"]>> => {
	if (info === undefined) {
		return [];
	}

	if (info === "TOTAL") {
		return ["line", "sensor"];
	}

	return ["line", "pie", "bar"];
};
