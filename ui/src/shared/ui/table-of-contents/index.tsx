import React from "react";
import type { FC } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

import { $hooks } from "@shared";

interface Props {
	contents: Array<{ label: string; id: string; level: number }>;
}

const TableOfContents: FC<Props> = ({ contents }) => {
	const ids = contents.map((item) => item.id);
	const [activeId, scrollIntoView] = $hooks.useScrollSpy(ids);

	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "16%",
				height: "100%",
				overflowY: "auto",
				padding: 2,
				zIndex: 1100,
				backgroundColor: "transparent",
				paddingTop: "128px", // header height x2
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
			}}
		>
			<Box
				sx={{
					border: "1px solid var(--disabled)",
					borderRadius: "8px",
					paddingInline: "1rem 0.25rem",
					paddingBlock: "1rem",
				}}
			>
				<Typography
					variant="tableHeader"
					gutterBottom
					style={{ color: "var(--grey)" }}
				>
					Table of Contents
				</Typography>
				<List dense>
					{contents.map((item, index) => (
						<ListItem
							key={index}
							sx={{
								position: "relative",
								paddingLeft: "2rem",
								"&::before": {
									content: '""',
									width: "4px",
									height: "4px",
									borderRadius: "10px",
									position: "absolute",
									top: "10px",
									left: "1rem",
									background:
										item.id === activeId ? "var(--accent)" : "var(--grey)",
								},
							}}
						>
							<Link
								underline="none"
								variant="base"
								onClick={() => scrollIntoView(item.id)}
								sx={{
									fontWeight: item.id === activeId ? 600 : 400,
									color: item.id === activeId ? "var(--accent)" : "var(--grey)",
									maxWidth: "100%",
									textOverflow: "ellipsis",
									overflow: "hidden",
									whiteSpace: "nowrap",
									cursor: "pointer",
								}}
							>
								{item.label}
							</Link>
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	);
};

export default TableOfContents;
