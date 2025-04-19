import React from "react";
import { Typography, Box } from "@mui/material";

export const SectionHeader = ({
	icon: Icon,
	title,
}: {
	icon: React.ElementType;
	title: string;
}) => (
	<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
		<Icon color="primary" sx={{ mr: 1 }} />
		<Typography variant="h5" component="h2">
			{title}
		</Typography>
	</Box>
);
