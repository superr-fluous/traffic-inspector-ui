import type { Layout } from "react-grid-layout";

import type { FeatureList } from "@features";

// --- GENERAL ---
export interface Model {
	i: Layout["i"]; // ensure compatible since used for matching widget in layout
	name: string;
	dataSource: DataSource;
	dataInfo: DataInfo;
	dataVisual: DataVisual
	config: Config;
	filters: Filters;
	bookmarked: boolean;
}

export interface PulledWidgetModel extends Model {
	origin: string;
}

type DataSource = "flows" | "system";
type DataInfo = "asn" | "ip" | "os" | "protocol" | "country" | "category" | "total";
type DataVisual = "bar" | "pie" | "line" | "sensor";

export interface Config {}
export interface Filters {}

// --- MISC ---
export interface GenericWidgetViewProps {
	config: Config;
}
