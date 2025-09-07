import React from "react";
import type { CSSProperties, ElementType, FC, ReactNode } from "react";

import { Typography, Box } from "@mui/material";

interface Props {
	title: ReactNode;
	icon?: ElementType;
	style?: CSSProperties;
}

const BlockHeader: FC<Props> = ({ icon: Icon, title, style = {} }) => (
	<Box style={{ ...style, display: "flex", alignItems: "center" }}>
		{Icon && <Icon color='primary' sx={{ mr: 1 }} />}
		<Typography variant='blockHeader'>{title}</Typography>
	</Box>
);

export default BlockHeader;

