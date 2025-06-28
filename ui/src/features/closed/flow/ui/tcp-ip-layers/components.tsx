import React from "react";
import type { FC } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";

import SwapIcon from "@mui/icons-material/SwapHorizontalCircle";

import { COLORS } from "@layout/theme";
import { $features } from "@features";

import type { FlowDetailed } from "../../model";

interface LayersProps {
	ipv: FlowDetailed["ipv"];
	proto: FlowDetailed["proto"];
	port: FlowDetailed["src_port"];
	ip: FlowDetailed["src_ip"];
	mac: FlowDetailed["src_mac"];
}

const Layers: FC<LayersProps> = ({ ip, ipv, mac, port, proto }) => (
	<Box
		sx={{
			display: "flex",
			flexDirection: "column",
			borderRadius: "8px",
			gap: 1,
			p: 1,
			backgroundColor: "var(--disabled)",
			minWidth: 220,
			position: "relative",
		}}
	>
		{/* Transport Layer */}
		<Box
			sx={{
				p: 1,
				backgroundColor: "var(--bg)",
				marginTop: -0.5,
				borderRadius: "4px",
				zIndex: 1,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "space-between",
					gap: "0.5rem",
				}}
			>
				<Typography variant='base' color='primary'>
					Transport Layer
				</Typography>
				<Typography variant='base' color='textPrimary' fontFamily='monospace'>
					Port: {port}
				</Typography>
			</Box>
			<Chip label={proto} size='small' sx={{ ml: 1 }} style={{ backgroundColor: COLORS.disabled }} />
		</Box>

		{/* Network Layer (IP) */}
		<Box
			sx={{
				p: 1,
				backgroundColor: "var(--bg)",
				marginTop: -0.5,
				borderRadius: "4px",
				zIndex: 1,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "space-between",
					gap: "0.5rem",
				}}
			>
				<Typography variant='base' color='primary'>
					Network Layer
				</Typography>
				<Typography variant='base' fontFamily='monospace'>
					{ip}
				</Typography>
			</Box>
			<Chip label={`IPv${ipv}`} size='small' sx={{ ml: 1 }} style={{ backgroundColor: COLORS.disabled }} />
		</Box>

		{/* Physical Layer (MAC) */}
		<Box
			sx={{
				p: 1,
				backgroundColor: "var(--bg)",
				marginTop: -0.5,
				borderRadius: "4px",
				zIndex: 1,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-start",
					alignItems: "space-between",
					gap: "0.5rem",
				}}
			>
				<Typography variant='base' color='primary'>
					Data Link Layer
				</Typography>
				<Typography variant='base' fontFamily='monospace'>
					{mac || "00:00:00:00:00:00"}
				</Typography>
			</Box>
			<Chip label='MAC' size='small' sx={{ ml: 1 }} style={{ backgroundColor: COLORS.disabled }} />
		</Box>
	</Box>
);

interface AsProps {
	src_as: FlowDetailed["src_as"];
	src_country: FlowDetailed["src_country"];
	dst_as: FlowDetailed["dst_as"];
	dst_country: FlowDetailed["dst_country"];
}

const As: FC<AsProps> = ({ dst_as, dst_country, src_as, src_country }) => (
	<Box
		sx={{
			display: "flex",
			alignItems: "center",
			gap: 2,
			flexDirection: { xs: "column", md: "row" },
		}}
	>
		{/* Source Country/ASN Table */}
		<TableContainer
			sx={{
				border: "1px solid",
				borderColor: "divider",
				borderRadius: 1,
				minWidth: 160,
				textAlign: "center",
			}}
		>
			<Table size='small'>
				<TableBody>
					<TableRow>
						<TableCell
							sx={{
								borderBottom: "none",
								py: 1,
								textAlign: "center",
								verticalAlign: "middle",
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: 1,
								}}
							>
								<$features.open.country.view.flag code={src_country} size='xl' />
							</Box>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							sx={{
								py: 1,
								textAlign: "center",
								verticalAlign: "middle",
							}}
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Chip
									label={`${src_as}`}
									size='small'
									sx={{
										fontFamily: "monospace",
										maxWidth: "100%",
										display: "flex",
										justifyContent: "center",
									}}
								/>
							</Box>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>

		<SwapIcon
			sx={{
				fill: COLORS.accent,
				fontSize: 40,
				transform: "rotate(90deg) scale(1.5)",
				"@media (min-width: 600px)": {
					transform: "rotate(0deg) scale(1.5)",
				},
				transition: "transform 0.3s ease",
			}}
		/>

		{/* Destination Country/ASN Table */}
		<Box
			sx={{
				border: "1px solid",
				borderColor: "divider",
				borderRadius: 1,
				minWidth: 160,
				textAlign: "center",
			}}
		>
			<Table size='small'>
				<TableBody>
					<TableRow>
						<TableCell
							sx={{
								borderBottom: "none",
								py: 1,
								textAlign: "center",
								verticalAlign: "middle",
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: 1,
								}}
							>
								<$features.open.country.view.flag code={dst_country} size='xl' />
							</Box>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell
							sx={{
								py: 1,
								textAlign: "center",
								verticalAlign: "middle",
							}}
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Chip
									label={dst_as}
									size='small'
									sx={{
										fontFamily: "monospace",
										maxWidth: "100%",
										display: "flex",
										justifyContent: "center",
									}}
								/>
							</Box>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Box>
	</Box>
);

export default { Layers, As };

