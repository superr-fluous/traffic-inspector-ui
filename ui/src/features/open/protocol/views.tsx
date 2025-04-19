import React from "react";
import type { FC } from "react";

import { Paper, Grid, Typography, Chip } from "@mui/material";
import { Security as SecurityIcon } from "@mui/icons-material";

import { SectionHeader } from "@shared/ui/section-header";

import type { FEATURE_FLOW_MODEL } from "@features/closed/flow";

interface Props {
	details: Pick<
		FEATURE_FLOW_MODEL["detailed"]["ndpi"],
		| "breed"
		| "proto"
		| "category"
		| "confidence"
		| "encrypted"
		| "hostname"
		| "domainame"
	>;
}

export const Info: FC<Props> = ({ details }) => (
	<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
		<SectionHeader icon={SecurityIcon} title="Protocol Analysis" />

		<Grid container spacing={2}>
			{/* Protocol */}
			<Grid item xs={6} sm={4} md={2}>
				<Typography variant="caption" color="text.secondary">
					Protocol
				</Typography>
				<Chip
					label={details.proto}
					size="small"
					color={details.proto === "Unknown" ? "error" : "primary"}
					sx={{
						mt: 0.5,
						width: "100%",
						...(details.proto === "Unknown" && {
							backgroundColor: "error.main",
							color: "error.contrastText",
						}),
					}}
				/>
			</Grid>

			{/* Breed */}
			<Grid item xs={6} sm={4} md={2}>
				<Typography variant="caption" color="text.secondary">
					Breed
				</Typography>
				<Typography variant="body2" sx={{ mt: 0.5 }} noWrap>
					{details.breed}
				</Typography>
			</Grid>

			{/* Category */}
			<Grid item xs={6} sm={4} md={2}>
				<Typography variant="caption" color="text.secondary">
					Category
				</Typography>
				<Typography variant="body2" sx={{ mt: 0.5 }} noWrap>
					{details.category}
				</Typography>
			</Grid>

			{/* Confidence */}
			{details.confidence && (
				<Grid item xs={6} sm={4} md={2}>
					<Typography variant="caption" color="text.secondary">
						Confidence
					</Typography>
					<Typography variant="body2" sx={{ mt: 0.5 }}>
						{Object.values(details.confidence)[0]}
					</Typography>
				</Grid>
			)}
			{/* Hostname */}
			{details.hostname && (
				<Grid item xs={6} sm={4} md={2}>
					<Typography variant="caption" color="text.secondary">
						Hostname
					</Typography>
					<Typography
						variant="body2"
						sx={{
							mt: 0.5,
							wordBreak: "break-word",
						}}
					>
						{details.hostname}
					</Typography>
				</Grid>
			)}

			{/* Domain */}
			{details.domainame && (
				<Grid item xs={6} sm={4} md={2}>
					<Typography variant="caption" color="text.secondary">
						Domain
					</Typography>
					<Typography
						variant="body2"
						sx={{
							mt: 0.5,
							wordBreak: "break-word",
						}}
					>
						{details.domainame}
					</Typography>
				</Grid>
			)}

			{/* Encrypted */}
			<Grid item xs={6} sm={4} md={2}>
				<Typography variant="caption" color="text.secondary">
					Encrypted
				</Typography>
				<Chip
					label={details.encrypted ? "Yes" : "No"}
					size="small"
					color={details.encrypted ? "success" : "error"}
					sx={{
						mt: 0.5,
						width: "100%",
					}}
				/>
			</Grid>
		</Grid>
	</Paper>
);
