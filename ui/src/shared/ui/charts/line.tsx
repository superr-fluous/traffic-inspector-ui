import React from 'react';
import type { FC } from "react";

import { ResponsiveLineCanvas } from '@nivo/line';
import type { PartialTheme } from "@nivo/theming";

import { COLORS } from '@layout/theme';

const theme: PartialTheme = {
	text: {
		"fontSize": 16,
		"fontWeight": 600,
		"fill": COLORS.bg,
	},
	tooltip: {
		container: {
			background: COLORS.bg,
			color: COLORS.white,
			fontSize: 16,
		}
	}
};

const Line: FC<Parameters<typeof ResponsiveLineCanvas>[0]> = ({ colors, curve, margin, xScale, yScale, ...props }) => (
	<ResponsiveLineCanvas
		{...props}
		curve={curve ?? "natural"}
		colors={colors ?? [COLORS.accent]}
		margin={margin ?? { top: 10, right: 20, bottom: 20, left: 20 }}
		xScale={xScale ?? { type: "point" }}
		yScale={yScale ?? { type: "linear", min: "auto", max: "auto" }}
		theme={theme}
	/>
);

export default Line;
