import React, { CSSProperties, PropsWithChildren } from "react";

import styles from "./styles.module.css";
import { $helpers } from "@shared";
import { Typography } from "@mui/material";

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
		<div className={$helpers.clsx(styles["ribbon-label-wrapper"], className)} style={style}>
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
