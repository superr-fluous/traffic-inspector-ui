import React from "react";
import type { FC } from "react";

import {
	Paper,
	Typography,
	Chip,
	Stack,
	Box,
	List,
	ListItem,
	Divider,
	ListItemText,
} from "@mui/material";
import DnsIcon from "@mui/icons-material/Dns";

import { SectionHeader } from "@shared/ui/section-header";

import { replyCodes, types } from "./helpers";
import type Model from "./model";

interface Props {
	details: Model;
}

const Info: FC<Props> = ({ details }) => {
	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<SectionHeader icon={DnsIcon} title="DNS Information" />

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
						fontSize: "0.875rem",
						color: "text.secondary",
					}}
				>
					<span>
						Queries: <strong>{details.num_queries}</strong>
					</span>
					<Box component="span" sx={{ mx: 0.5 }}>
						•
					</Box>
					<span>
						Answers: <strong>{details.num_answers}</strong>
					</span>
				</Box>
			</Stack>

			<Divider sx={{ my: 2 }} />

			{details.rsp_addr?.length > 0 && (
				<>
					<Typography variant="subtitle2" gutterBottom>
						Responses ({details.num_answers}):
					</Typography>
					<List dense sx={{ mb: 2 }}>
						{details.rsp_addr.map((addr, index) => {
							const [ip, ttl] = addr.split(",ttl=");
							return (
								<ListItem key={index}>
									<ListItemText
										primary={ip}
										secondary={`TTL: ${ttl}`}
										slotProps={{
											primary: { style: { fontFamily: "monospace" } },
										}}
									/>
								</ListItem>
							);
						})}
					</List>
				</>
			)}
		</Paper>
	);
};

export default Info;
