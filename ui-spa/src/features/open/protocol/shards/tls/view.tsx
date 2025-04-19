import React from "react";
import type { FC } from "react";

import { Paper, List, ListItem, ListItemText, Chip } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Lock as LockIcon } from "@mui/icons-material";

import { SectionHeader } from "@shared/ui/section-header";

import type Model from "./model";

interface Props {
	details: Model;
}

const Info: FC<Props> = ({ details }) => {
	return (
		<Paper elevation={3} sx={{ p: 2, mb: 2 }}>
			<SectionHeader icon={LockIcon} title="TLS Details" />
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<List dense>
						<ListItem>
							<ListItemText
								primary="Version"
								secondary={details.version}
								slotProps={{ primary: { variant: "subtitle2" } }}
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary="JA3S"
								secondary={details.ja3s}
								slotProps={{ primary: { variant: "subtitle2" } }}
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary="JA4"
								secondary={details.ja4}
								slotProps={{ primary: { variant: "subtitle2" } }}
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary="Unsafe Cipher"
								secondary={
									<Chip
										label={details.unsafe_cipher ? "Yes" : "No"}
										size="small"
										color={details.unsafe_cipher ? "error" : "success"}
									/>
								}
								slotProps={{ primary: { variant: "subtitle2" } }}
							/>
						</ListItem>
					</List>
				</Grid>
				<Grid item xs={12} md={6}>
					<List dense>
						<ListItem>
							<ListItemText
								primary="Cipher"
								secondary={details.cipher}
								slotProps={{ primary: { variant: "subtitle2" } }}
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary="Advertised ALPNs"
								secondary={details.advertised_alpns}
								slotProps={{ primary: { variant: "subtitle2" } }}
							/>
						</ListItem>
						<ListItem>
							<ListItemText
								primary="TLS Supported Versions"
								secondary={details.tls_supported_versions}
								slotProps={{ primary: { variant: "subtitle2" } }}
							/>
						</ListItem>
					</List>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Info;
