import React from "react";
import type { FC } from "react";

import Chip from "@mui/material/Chip";

import { $helpers } from "@shared";

import { color } from "../helpers";
import type { Category } from "../model";

interface Props {
	category: Category;
}

const Badge: FC<Props> = ({ category }) => (
	<Chip
		label={category}
		sx={{
			backgroundColor: color[category],
			color: $helpers.style.isColorLight(color[category])
				? "#333333"
				: "#FAF0E6",
			fontWeight: "bold",
		}}
	/>
);

export default Badge;
