import React, { useEffect, useState } from "react";
import type { FC } from "react";

import {
	Container,
	Paper,
	Typography,
	Chip,
	Box,
	Table,
	TableBody,
	TableRow,
	TableCell,
	CircularProgress,
	TableContainer,
} from "@mui/material";
import { SwapHorizontalCircle as SwapIcon } from "@mui/icons-material";

import { FEATURE_FLAG } from "@features/open/flag";
import { FEATURE_PROTOCOL } from "@features/open/protocol";

import { getFlow } from "../endpoint/query";
import { ByteRatioBar } from "../ui/byte-ratio-bar";
import type { Flow, FlowDetailed } from "../model";

interface Props {
	flow_id: Flow["id"];
}

const Info: FC<Props> = ({ flow_id }) => {
	const [data, setData] = useState<FlowDetailed | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const doFetch = async () => {
		setIsLoading(true);
		const res = await getFlow(flow_id);
		setIsLoading(false);

		if (res.success) {
			setError(null);
			setData(res.data);
		} else {
			setData(null);
			setError(res.reason!);
		}
	};

	useEffect(() => {
		doFetch();
	}, [flow_id]);

	return (
		<Container
			style={{
				width: "100%",
				maxWidth: "100%",
				height: "100%",
				maxHeight: "100",
				paddingInline: 0,
			}}
		>
			{isLoading && (
				<Box
					sx={{
						display: "inline-flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
						width: "100%",
						bgcolor: "background.default",
					}}
				>
					<div style={{ margin: "0.25rem" }}>
						<CircularProgress size={60} thickness={4} />
					</div>
				</Box>
			)}
			{!isLoading && error !== null && (
				<Typography
					align="center"
					sx={{ fontWeight: 600 }}
					gutterBottom
					color="error"
				>
					{error}
				</Typography>
			)}
			{!isLoading && error === null && data !== null && (
				<>
					{/* Connection Flow Section */}
					<ByteRatioBar
						source={data.src_len_pkts}
						destination={data.dst_len_pkts}
					/>
					<Paper elevation={3} sx={{ p: 3, mb: 3 }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								gap: 2,
								flexWrap: "wrap",
							}}
						>
							{/* Source Block */}
							<Box
								sx={{
									display: "flex",
									flexDirection: "column-reverse",
									gap: 0.5,
									border: "1px solid",
									borderColor: "divider",
									borderRadius: 1,
									p: 1,
									bgcolor: "background.paper",
									minWidth: 220,
									position: "relative",
								}}
							>
								{/* Physical Layer (MAC) */}
								<Box
									sx={{
										p: 1,
										bgcolor: "grey.100",
										border: "1px solid",
										borderColor: "grey.300",
										borderRadius: 1,
									}}
								>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Typography variant="caption" color="text.secondary">
											Data Link Layer
										</Typography>
										<Chip label="MAC" size="small" sx={{ ml: 1 }} />
									</Box>
									<Typography variant="body2" fontFamily="monospace">
										{data.src_mac || "00:00:00:00:00:00"}
									</Typography>
								</Box>

								{/* Network Layer (IP) */}
								<Box
									sx={{
										p: 1,
										bgcolor: "grey.50",
										border: "1px solid",
										borderColor: "grey.200",
										borderRadius: 1,
										marginTop: -0.5,
										zIndex: 1,
									}}
								>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Typography variant="caption" color="text.secondary">
											Network Layer
										</Typography>
										<Chip
											label={`IPv${data.ipv}`}
											size="small"
											sx={{ ml: 1 }}
										/>
									</Box>
									<Typography variant="body2" fontFamily="monospace">
										{data.src_ip}
									</Typography>
								</Box>

								{/* Transport Layer */}
								<Box
									sx={{
										p: 1,
										bgcolor: "common.white",
										border: "1px solid",
										borderColor: "grey.100",
										borderRadius: 1,
										marginTop: -0.5,
										zIndex: 2,
									}}
								>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Typography variant="caption" color="text.secondary">
											Transport Layer
										</Typography>
										<Chip label={data.proto} size="small" sx={{ ml: 1 }} />
									</Box>
									<Typography variant="body2" fontFamily="monospace">
										Port: {data.src_port}
									</Typography>
								</Box>
							</Box>

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
									<Table size="small">
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
														<FEATURE_FLAG.view.inline code={data.src_country} />
														<Typography variant="body2">
															{data.src_country || "N/A"}
														</Typography>
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
															label={`${data.src_as}`}
															size="small"
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
									color="action"
									sx={{
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
									<Table size="small">
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
														<FEATURE_FLAG.view.inline code={data.dst_country} />
														<Typography variant="body2">
															{data.dst_country || "N/A"}
														</Typography>
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
															label={`${data.dst_as}`}
															size="small"
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

							<Box
								sx={{
									display: "flex",
									flexDirection: "column-reverse",
									gap: 0.5,
									border: "1px solid",
									borderColor: "divider",
									borderRadius: 1,
									p: 1,
									bgcolor: "background.paper",
									minWidth: 220,
									position: "relative",
								}}
							>
								{/* Physical Layer (MAC) */}
								<Box
									sx={{
										p: 1,
										bgcolor: "grey.100",
										border: "1px solid",
										borderColor: "grey.300",
										borderRadius: 1,
									}}
								>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Typography variant="caption" color="text.secondary">
											Data Link Layer
										</Typography>
										<Chip label="MAC" size="small" sx={{ ml: 1 }} />
									</Box>
									<Typography variant="body2" fontFamily="monospace">
										{data.dst_mac || "00:00:00:00:00:00"}
									</Typography>
								</Box>

								{/* Network Layer (IP) */}
								<Box
									sx={{
										p: 1,
										bgcolor: "grey.50",
										border: "1px solid",
										borderColor: "grey.200",
										borderRadius: 1,
										marginTop: -0.5,
										zIndex: 1,
									}}
								>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Typography variant="caption" color="text.secondary">
											Network Layer
										</Typography>
										<Chip
											label={`IPv${data.ipv}`}
											size="small"
											sx={{ ml: 1 }}
										/>
									</Box>
									<Typography variant="body2" fontFamily="monospace">
										{data.dst_ip}
									</Typography>
								</Box>

								{/* Transport Layer */}
								<Box
									sx={{
										p: 1,
										bgcolor: "common.white",
										border: "1px solid",
										borderColor: "grey.100",
										borderRadius: 1,
										marginTop: -0.5,
										zIndex: 2,
									}}
								>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<Typography variant="caption" color="text.secondary">
											Transport Layer
										</Typography>
										<Chip label={data.proto} size="small" sx={{ ml: 1 }} />
									</Box>
									<Typography variant="body2" fontFamily="monospace">
										Port: {data.dst_port}
									</Typography>
								</Box>
							</Box>
						</Box>
					</Paper>

					<FEATURE_PROTOCOL.view.info.full
						details={{
							breed: data.ndpi.breed,
							proto: data.ndpi.proto,
							category: data.ndpi.proto,
							hostname: data.ndpi.category,
							domainame: data.ndpi.domainame,
							encrypted: data.ndpi.encrypted,
							confidence: data.ndpi.confidence,
						}}
					/>

					{data.ndpi.tls && (
						<FEATURE_PROTOCOL.view.info.tls details={data.ndpi.tls} />
					)}

					{data.ndpi.dns && (
						<FEATURE_PROTOCOL.view.info.dns details={data.ndpi.dns} />
					)}
				</>
			)}
		</Container>
	);
};

export default Info;
