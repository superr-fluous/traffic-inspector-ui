import type { ReactNode } from "react";

export interface WidgetModel {
	x: number;
	y: number;
	w: number;
	h: number;
	id: string;
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
