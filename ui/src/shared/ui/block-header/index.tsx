import React from "react";
import type { ElementType, FC, ReactNode } from "react";

import { Typography, Box } from "@mui/material";

interface Props {
	icon: ElementType;
	title: ReactNode;
}

const BlockHeader: FC<Props> = ({ icon: Icon, title }) => (
	<Box style={{ display: "flex", alignItems: "center" }}>
		<Icon color="primary" sx={{ mr: 1 }} />
		<Typography variant="blockHeader">{title}</Typography>
	</Box>
);

export default BlockHeader;
