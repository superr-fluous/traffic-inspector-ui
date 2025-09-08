import type { Layout as ReactGridLayout } from "react-grid-layout";
import type { PartialKeys } from "@shared/helpers/types";

export interface Layout {
	i: ReactGridLayout["i"];
	w: ReactGridLayout["w"];
	h: ReactGridLayout["h"];
	x: ReactGridLayout["x"];
	y: ReactGridLayout["y"];
	name: string;
}

export type Model = Layout[];

export type ViewList = "statistics" | "dashboard";

type LayoutFetched = PartialKeys<Layout, "x" | "y">;
export type ModelFetched = LayoutFetched[];
