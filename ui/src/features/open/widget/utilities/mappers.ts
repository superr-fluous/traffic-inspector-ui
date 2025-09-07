import type { Defined, Undefined } from "@shared/helpers/types";

// FLAW: circular imports, cant import $features here (?feature-sinks?, ?sinks/features?)
import $ip from "../../ip";
import $os from "../../os";
import $asn from "../../asn";
import $country from "../../country";
import $category from "../../category";
import $protocol from "../../protocol";
import $flow from "../../../closed/flow";

import type { Config } from "../model";

const widgetVisualMapper = {
	asn: {
		bar: $asn.view.chart.top,
		pie: $asn.view.chart.top,
		line: $asn.view.chart.top,
	},
	category: {
		bar: $category.view.chart.top,
		pie: $category.view.chart.top,
		line: $category.view.chart.top,
	},
	country: {
		bar: $country.view.chart.top,
		pie: $country.view.chart.top,
		line: $country.view.chart.top,
	},
	ip: {
		bar: $ip.view.chart.top,
		pie: $ip.view.chart.top,
		line: $ip.view.chart.top,
	},
	os: {
		bar: $os.view.chart.top,
		pie: $os.view.chart.top,
		line: $os.view.chart.top,
	},
	protocol: {
		bar: $protocol.view.chart.top,
		pie: $protocol.view.chart.top,
		line: $protocol.view.chart.top,
	},
	total: {
		sensor: $flow.view.total,
		line: $flow.view.chart.totalOverTime,
	},
};

const widgetVisual = (info: Undefined<Config["dataInfo"]>, visual: Undefined<Config["dataVisual"]>) => {
	if (info === undefined || visual === undefined) {
		return null;
	}

	// @ts-expect-error FIXME
	return widgetVisualMapper[info]?.[visual] ?? null;
};

export default { widgetVisual };
