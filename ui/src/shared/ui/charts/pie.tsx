import React from 'react';
import type { FC } from "react";

import { ResponsivePieCanvas } from '@nivo/pie';
import type { PartialTheme } from "@nivo/theming";

import { COLORS } from '@layout/theme';

const theme: PartialTheme = {
	text: {
		"fontSize": 14,
		"fontWeight": 400,
		"fill": COLORS.white,
	},
	tooltip: {
		container: {
			background: COLORS.bg,
			color: COLORS.white,
			fontSize: 16,
		}
	}
};

const Pie: FC<Parameters<typeof ResponsivePieCanvas>[0]> = ({ enableArcLinkLabels, arcLabel, arcLabelsRadiusOffset, arcLabelsTextColor, margin, sortByValue, colors, borderWidth, borderColor, ...props }) => (
	<ResponsivePieCanvas
		{...props}
		enableArcLinkLabels={enableArcLinkLabels ?? false}
		arcLabel={arcLabel ?? "id"}
		arcLabelsRadiusOffset={arcLabelsRadiusOffset ?? 0.6}
		borderColor={borderColor ?? "theme"}
		borderWidth={borderWidth ?? 2}
		margin={margin ?? { top: 10, bottom: 20, left: 20, right: 20 }}
		colors={colors ?? [COLORS.accent]}
		sortByValue={sortByValue ?? true}
		theme={theme}
	/>
);

export default Pie;
