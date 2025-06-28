import React from "react";
import type { FC, PropsWithChildren, ReactNode, CSSProperties } from "react";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { $ui } from "@shared";

import styles from "./styles.module.css";

interface Props extends PropsWithChildren {
	header: ReactNode;
	error?: ReactNode;
	loading?: boolean;
	size?: { w?: CSSProperties["width"]; h?: CSSProperties["height"] };
}

const Widget: FC<Props> = ({ loading, header, error, size = { w: "16rem", h: "24rem" }, children }) => {
	const width = size.w ?? "16rem";
	const height = size.h ?? "24rem";

	return (
		<div className={styles["widget-container"]} style={{ width, height, maxWidth: width, maxHeight: height }}>
			<Typography variant='blockHeader'>{header}</Typography>
			<Divider />
			<div className={styles["widget-wrapper"]}>
				{loading && <$ui.loader size='xl' />}
				{!!error && (
					<Typography
						sx={{ display: "block", width: "100%", height: "100%", textAlign: "center", alignContent: "middle" }}
						variant='error'
					>
						{error}
					</Typography>
				)}
				{!loading && !error && children}
			</div>
		</div>
	);
};

export default Widget;
