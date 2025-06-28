import React from "react";
import type { ComponentProps, FC } from "react";

import Typography from "@mui/material/Typography";

import { $hooks, $ui } from "@shared";

import AnimatedNumber from "./components";

interface Props extends ComponentProps<"div"> {
	size?: "sm" | "default" | "lg" | "xl";
}

const sizeMultiplier = {
	sm: 1,
	default: 1.25,
	lg: 1.5,
	xl: 2,
};

const baseLoaderSize = 24;
const baseLoaderThickness = 4;

const Total: FC<Props> = (props) => {
	const size = props.size ?? "default";

	// fetch
	const { data, isLoading, error } = $hooks.useFetch<number, null>("flows/total", [], {
		interval: 30000,
		defaultValue: null,
	});

	console.log(data);

	return (
		<div
			{...props}
			style={{
				...props.style,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				height: "100%",
				width: "100%",
			}}
		>
			<Typography
				variant='blockHeader'
				style={{
					fontSize: `${sizeMultiplier[size] + 0.25}rem`,
					color: "var(--accent)",
				}}
			>
				{isLoading && (
					<$ui.loader
						size={baseLoaderSize * sizeMultiplier[size]}
						thickness={baseLoaderThickness * sizeMultiplier[size]}
					/>
				)}
				{!isLoading && error !== null && (
					<Typography variant='error' sx={{ fontSize: "1rem" }}>
						{error}
					</Typography>
				)}
				{!isLoading && error === null && data === null && "Unknown"}
				{!isLoading && error !== null && data !== null && <AnimatedNumber number={data} />}
			</Typography>
			<Typography variant='tableCell' style={{ fontSize: `${sizeMultiplier[size] - 0.25}rem`, lineHeight: 2 }}>
				Total flows
			</Typography>
		</div>
	);
};

export default Total;
