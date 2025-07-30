import type { ReactNode } from "react";
import type { Layout } from "react-grid-layout";

import type { FeaturesList } from "@features";

export interface WidgetModel {
	i: Layout["i"]; // ensure compatible since used for matching widget in layout
	active: boolean;
	config: WidgetConfig;
	name: string;
	bookmarked: boolean;
}

export interface PulledWidgetModel extends WidgetModel {
	origin: string;
}

type WidgetDataSource = "flows" | "system";
type WidgetInfo = FeaturesList["closed"] | "TOTAL";
type WidgetVisual = "bar" | "pie" | "line" | "sensor";

export type WidgetConfig = Partial<
	| {
			dataSource: WidgetDataSource;
			dataInfo: Exclude<WidgetInfo, "TOTAL">;
			dataVisual: Exclude<WidgetVisual, "sensor">;
	  }
	| {
			dataSource: WidgetDataSource;
			dataInfo: Extract<WidgetInfo, "TOTAL">;
			dataVisual: Extract<WidgetVisual, "line" | "sensor">;
	  }
>;

export interface GenericWidgetViewProps {
	config: WidgetConfig;
}
