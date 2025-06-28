import React from "react";
import type { FC } from "react";

import { ResponsiveBarCanvas } from "@nivo/bar";
import type { PartialTheme } from "@nivo/theming";

import { COLORS } from "@layout/theme";

const theme: PartialTheme = {
	text: {
		fontSize: 14,
		fontWeight: 400,
		fill: COLORS.white,
	},
	tooltip: {
		container: {
			background: COLORS.bg,
			color: COLORS.white,
			fontSize: 16,
		},
	},
};

const Bar: FC<Parameters<typeof ResponsiveBarCanvas>[0]> = ({ label, colors, layout, margin, ...props }) => (
	<ResponsiveBarCanvas
		{...props}
		colors={colors ?? [COLORS.accent]}
		margin={margin ?? { top: 10, right: 20, bottom: 50, left: 60 }}
		layout={layout ?? "vertical"}
		theme={theme}
	/>
);

export default Bar;
