import React from "react";
import type { CSSProperties, PropsWithChildren } from "react";

import { Typography } from "@mui/material";

import { $helpers } from "@shared";

import styles from "./styles.module.css";

interface Props extends PropsWithChildren {
	label: string | number | null;
	placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	className?: string;
	style?: CSSProperties;
}

/**
 * @description to correctly display the label there must be successive `background: inherit` styles on EVERY ancestor up to the on the sets actual background
 */
export default function RibbonLabel({ label, placement = "top-left", className, style, children }: Props) {
	return (
		<div className={$helpers.clsx(className, styles["ribbon-label-wrapper"])} style={style}>
			<Typography
				variant='base'
				className={$helpers.clsx(styles["ribbon-label-label"], styles[`ribbon-label-label-${placement}`])}
			>
				{label}
			</Typography>
			{children}
		</div>
	);
}
