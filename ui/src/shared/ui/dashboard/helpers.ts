import { nanoid } from "nanoid";

import type { WidgetModel } from "./model";

export const makeWidget = (size: { w: number; h: number }): WidgetModel => ({
	...size,
	x: Infinity,
	y: Infinity,
	i: nanoid(),
	name: "New widget",
	active: true,
	children: "New widget",
});
