import type { Layout } from "react-grid-layout";

import type { FeatureList } from "@features";

// --- GENERAL ---
export interface Model {
	i: Layout["i"]; // ensure compatible since used for matching widget in layout
	// active: boolean; // inpertinent to widget
	config: Config;
	name: string;
	// bookmarked: boolean; // inpertinent to widget
}

export interface PulledWidgetModel extends Model {
	origin: string;
}

// --- CONFIG ---
type WidgetDataSource = "flows" | "system";
type WidgetInfo = FeatureList["closed"] | "TOTAL";
type WidgetVisual = "bar" | "pie" | "line" | "sensor";

export type Config = Partial<
	| {
			source: WidgetDataSource;
			info: Exclude<WidgetInfo, "TOTAL">;
			visual: Exclude<WidgetVisual, "sensor">;
	  }
	| {
			source: WidgetDataSource;
			info: Extract<WidgetInfo, "TOTAL">;
			visual: Extract<WidgetVisual, "line" | "sensor">;
	  }
>;

// --- MISC ---
export interface GenericWidgetViewProps {
	config: Config;
}
