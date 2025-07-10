import type { ReactNode } from "react";
import { Layout } from "react-grid-layout";

export interface WidgetModel extends Layout {
	name: string;
	active: boolean;
	children: ReactNode;
}

export interface EmptySlot {
	x: number;
	y: number;
	w: number;
	h: number;
}
