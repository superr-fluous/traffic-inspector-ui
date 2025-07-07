import React from "react";
import type { FC, ComponentProps, ReactNode } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import type { CircularProgressProps } from "@mui/material/CircularProgress";

import { COLORS } from "@layout/theme";
import Typography from "@mui/material/Typography";

type Props = ComponentProps<"div"> &
	CircularProgressProps & {
		loading: boolean;
		error: ReactNode;
	};

const Loader: FC<Props> = ({ loading, error, size = 32, thickness = 2, children, ...divProps }) => (
	<div
		{...divProps}
		style={{
			display: "inline-flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			height: "100%",
			width: "100%",
			backgroundColor: "transparent",
			...divProps.style,
		}}
	>
		<CircularProgress style={{ color: COLORS.accent }} size={size} thickness={thickness} />
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
);

export default Loader;

