import type { Option, Undefined } from "@shared/helpers/types";

import type { Config } from "../model";

const dataSourceOptions = (): Array<Option<Config["dataSource"]>> => [
	{
		label: "Flows",
		value: "flows",
	},
	{
		label: "System",
		value: "system",
	},
];

const dataInfoOptions = (dataSource: Undefined<Config["dataSource"]>): Array<Option<Config["dataInfo"]>> => {
	switch (dataSource) {
		case "flows":
			return [
				{
					value: "asn",
					label: "ASN",
				},
				{
					value: "category",
					label: "Category",
				},
				{
					value: "country",
					label: "Country",
				},
				{
					value: "ip",
					label: "IP",
				},
				{
					value: "os",
					label: "OS",
				},
				{
					value: "protocol",
					label: "Protocol",
				},
				{
					value: "total",
					label: "Total",
				},
			];
		case "system":
			return [];
		default:
			return [];
	}
};

const dataVisualOptions = (info: Undefined<Config["dataInfo"]>): Array<Option<Config["dataVisual"]>> => {
	if (info === undefined) {
		return [];
	}

	if (info === "total") {
		return [
			{
				value: "line",
				label: "Line",
			},
			{
				value: "sensor",
				label: "Sensor",
			},
		];
	}

	return [
		{
			value: "line",
			label: "Line",
		},
		{
			value: "pie",
			label: "Pie",
		},
		{
			value: "bar",
			label: "Bar",
		},
	];
};

export default { dataInfoOptions, dataVisualOptions, dataSourceOptions };
