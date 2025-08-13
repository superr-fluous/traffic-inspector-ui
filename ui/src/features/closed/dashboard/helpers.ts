import { nanoid } from "nanoid";

import { Layout } from "./model";

export const makeLayout = (size: { w: number; h: number }): Layout => ({
	...size,
	x: Infinity,
	y: Infinity,
	i: nanoid(),
	active: true,
	meta: {
		bookmarked: false,
		name: "New widget",
	},
});
