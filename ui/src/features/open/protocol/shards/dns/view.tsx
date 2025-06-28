import React from "react";
import type { FC } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";

import DnsIcon from "@mui/icons-material/Dns";

import { COLORS } from "@layout/theme";
import { $ui } from "@shared";

import { replyCodes, types } from "./helpers";
import type Model from "./model";

interface Props {
	details: Model;
}

const Info: FC<Props> = ({ details }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				flexWrap: "wrap",
				padding: "24px",
				borderRadius: "8px",
				border: "1px solid var(--disabled)",
			}}
		>
			<$ui.blockHeader icon={DnsIcon} title="DNS Information" />

			<Stack
				direction="row"
				spacing={1}
				sx={{ ml: 1, flexWrap: "wrap", gap: 1 }}
			>
				<Chip
					size="small"
					label={`Query: ${types[details.query_type] || "Unknown"} (${details.query_type})`}
					variant="outlined"
				/>

				<Chip
					size="small"
					label={`Response: ${replyCodes[details.rsp_type] || "Unknown"} (${details.rsp_type})`}
					variant="outlined"
				/>

				<Chip
					size="small"
					label={`Reply: ${details.reply_code} (${replyCodes[details.reply_code] || "Unknown"})`}
					color={details.reply_code === 0 ? "success" : "error"}
				/>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Typography variant="base">
						Queries: <strong>{details.num_queries}</strong>
					</Typography>
					<Box
						color={COLORS["off-white"]}
						component="span"
						style={{ marginInline: "0.5rem" }}
					>
						•
					</Box>
					<Typography variant="base">
						Answers: <strong>{details.num_answers}</strong>
					</Typography>
				</Box>
			</Stack>

			<Typography variant="baseXl">
				Response ({details.num_answers}):
			</Typography>
			{details.rsp_addr.map((addr, index) => {
				const [ip, ttl] = addr.split(",ttl=");
				return (
					<ListItem style={{ padding: "0 16px" }} key={index}>
						<ListItemText
							primary={ip}
							secondary={`TTL: ${ttl}`}
							slotProps={{
								primary: {
									style: {
										fontFamily: "monospace",
										color: COLORS["off-white"],
									},
								},
							}}
						/>
					</ListItem>
				);
			})}
		</Box>
	);
};

export default Info;
