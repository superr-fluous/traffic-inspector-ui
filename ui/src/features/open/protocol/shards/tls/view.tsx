import React from "react";
import type { FC } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Lock from "@mui/icons-material/Lock";

import { $ui } from "@shared";

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
				padding: 3,
				borderRadius: "8px",
				border: "1px solid var(--disabled)",
			}}
		>
			<$ui.blockHeader icon={Lock} title="TLS Details" />

			<Grid
				container
				spacing={2}
				style={{
					width: "100%",
					display: "grid",
					gridTemplateColumns: "repeat(5, 1fr)",
					rowGap: "2.25rem",
					columnGap: "2rem",
				}}
			>
				{/* Version */}
				<div
					style={{
						display: "inline-flex",
						flexDirection: "column",
						gap: "1.25rem",
					}}
				>
					<Typography style={{ alignSelf: "start" }} variant="baseXl">
						Version
					</Typography>
					<Chip
						label={details.version}
						size="small"
						color="success"
						style={{
							width: "fit-content",
							paddingInline: "1rem",
							alignSelf: "start",
						}}
					/>
				</div>
				{/* Cipher */}
				<div
					style={{
						display: "inline-flex",
						flexDirection: "column",
						gap: "1.25rem",
					}}
				>
					<Typography style={{ alignSelf: "start" }} variant="baseXl">
						Cipher
					</Typography>
					<Chip
						label={details.cipher}
						size="small"
						color="secondary"
						style={{
							width: "fit-content",
							paddingInline: "1rem",
							alignSelf: "start",
						}}
					/>
				</div>
				{/* Unsafe cipher */}
				<div
					style={{
						display: "inline-flex",
						flexDirection: "column",
						gap: "1.25rem",
					}}
				>
					<Typography style={{ alignSelf: "start" }} variant="baseXl">
						Unsafe Cipher
					</Typography>
					<Chip
						label={details.unsafe_cipher ? "Yes" : "No"}
						size="small"
						color={details.unsafe_cipher ? "error" : "success"}
						style={{
							alignSelf: "start",
							width: "fit-content",
							paddingInline: "1rem",
						}}
					/>
				</div>
				{/* TLS supported versions */}
				<div
					style={{
						display: "inline-flex",
						flexDirection: "column",
						gap: "1.25rem",
						gridColumnEnd: "span 2",
					}}
				>
					<Typography style={{ alignSelf: "start" }} variant="baseXl">
						TLS Supported Versions
					</Typography>
					<Typography
						variant="base"
						style={{
							alignSelf: "start",
							width: "fit-content",
							paddingInline: "1rem",
						}}
					>
						{details.tls_supported_versions}
					</Typography>
				</div>
				{/* Advertised ALPNs */}
				<div
					style={{
						display: "inline-flex",
						flexDirection: "column",
						gap: "1.25rem",
					}}
				>
					<Typography style={{ alignSelf: "start" }} variant="baseXl">
						Advertised ALPNs
					</Typography>
					<Typography
						variant="base"
						style={{
							alignSelf: "start",
							width: "fit-content",
							paddingInline: "1rem",
						}}
					>
						{details.advertised_alpns}
					</Typography>
				</div>
				{/* Negotiated ALPNs */}
				<div
					style={{
						display: "inline-flex",
						flexDirection: "column",
						gap: "1.25rem",
					}}
				>
					<Typography style={{ alignSelf: "start" }} variant="baseXl">
						Negotiated ALPN
					</Typography>
					<Typography
						variant="base"
						style={{
							alignSelf: "start",
							width: "fit-content",
							paddingInline: "1rem",
						}}
					>
						{details.negotiated_alpn}
					</Typography>
				</div>
				{/* JA3S */}
				<div
					style={{
						display: "inline-flex",
						flexDirection: "column",
						gap: "1.25rem",
					}}
				>
					<Typography style={{ alignSelf: "start" }} variant="baseXl">
						JA3s
					</Typography>
					<Typography
						variant="base"
						style={{
							alignSelf: "start",
							width: "fit-content",
							paddingInline: "1rem",
						}}
					>
						{details.ja3s}
					</Typography>
				</div>
				{/* JA4 */}
				<div
					style={{
						display: "inline-flex",
						flexDirection: "column",
						gap: "1.25rem",
						gridColumnEnd: "span 2",
					}}
				>
					<Typography style={{ alignSelf: "start" }} variant="baseXl">
						JA4
					</Typography>
					<Typography
						variant="base"
						style={{
							alignSelf: "start",
							width: "fit-content",
							paddingInline: "1rem",
						}}
					>
						{details.ja4}
					</Typography>
				</div>
			</Grid>
		</Box>
	);
};

export default Info;
