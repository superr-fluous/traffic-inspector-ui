import type { ReactNode } from "react";

export interface Widget {
	x: number;
	y: number;
	w: number;
	h: number;
	id: string;
	children: ReactNode;
}

export interface EmptySlot {
	x: number;
	y: number;
	w: number;
	h: number;
}
