import { Layout as ReactGridLayout } from "react-grid-layout";

export interface Layout {
	i: ReactGridLayout["i"];
	w: ReactGridLayout["w"];
	h: ReactGridLayout["h"];
	x: ReactGridLayout["x"];
	y: ReactGridLayout["y"];
	active: boolean;
	meta: {
		name: string;
		bookmarked: boolean;
	};
}

export type Model = Layout[];

export type ViewList = "statistics" | "dashboard";
