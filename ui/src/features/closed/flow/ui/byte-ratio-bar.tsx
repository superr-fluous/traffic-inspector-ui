import React from "react";
import type { FC } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DonutSmall from "@mui/icons-material/DonutSmall";

import { $helpers, $ui } from "@shared";

interface Props {
	source: number;
	destination: number;
}

export const ByteRatioBar: FC<Props> = ({
	source,
	destination,
}: {
	source: number;
	destination: number;
}) => {
	const total = source + destination;
	const sourceWidth = total > 0 ? (source / total) * 100 : 50;
	const destWidth = total > 0 ? (destination / total) * 100 : 50;

	return (
		<Box
			sx={{
				border: "1px solid var(--disabled)",
				borderRadius: 2,
				p: 2,
				display: "flex",
				flexDirection: "column",
				gap: 2.5,
			}}
		>
			<$ui.blockHeader icon={DonutSmall} title="Byte Ratio" />

			<div>
				{/* Progress Bar Container */}
				<Box
					sx={{
						height: 24,
						borderRadius: 12,
						bgcolor: "grey.200",
						overflow: "hidden",
						position: "relative",
						boxShadow: 1,
					}}
				>
					{/* Source Part */}
					<Box
						sx={{
							width: `${sourceWidth}%`,
							height: "100%",
							bgcolor: "primary.main",
							position: "absolute",
							left: 0,
							transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							pr: 2,
						}}
					>
						{sourceWidth > 12 && (
							<Typography
								variant="caption"
								sx={{ color: "white", fontWeight: "bold" }}
							>
								{sourceWidth.toFixed(1)}%
							</Typography>
						)}
					</Box>

					{/* Destination Part */}
					<Box
						sx={{
							width: `${destWidth}%`,
							height: "100%",
							bgcolor: "secondary.main",
							position: "absolute",
							right: 0,
							transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-start",
							pl: 2,
						}}
					>
						{destWidth > 12 && (
							<Typography
								variant="caption"
								sx={{ color: "white", fontWeight: "bold" }}
							>
								{destWidth.toFixed(1)}%
							</Typography>
						)}
					</Box>
				</Box>

				{/* Labels Container */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mt: 2,
						gap: 2,
					}}
				>
					<Box sx={{ textAlign: "center" }}>
						<Typography variant="body2" color="primary" fontWeight="bold">
							Source
						</Typography>
						<Typography variant="caption" color="text.secondary">
							{$helpers.data.prettyBytes(source)}
						</Typography>
					</Box>

					<Box sx={{ textAlign: "center" }}>
						<Typography variant="body2" color="text.secondary">
							Total
						</Typography>
						<Typography variant="caption" color="text.secondary">
							{$helpers.data.prettyBytes(total)}
						</Typography>
					</Box>

					<Box sx={{ textAlign: "center" }}>
						<Typography variant="body2" color="secondary" fontWeight="bold">
							Destination
						</Typography>
						<Typography variant="caption" color="text.secondary">
							{$helpers.data.prettyBytes(destination)}
						</Typography>
					</Box>
				</Box>
			</div>
		</Box>
	);
};
