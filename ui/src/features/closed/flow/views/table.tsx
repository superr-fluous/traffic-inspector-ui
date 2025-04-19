import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

import MUITable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { FEATURE_FLAG } from "@features/open/flag";
import { FEATURE_CATEGORY } from "@features/open/category";

import { getList, type TablePagination } from "../endpoint/query";
import type { Flow } from "../model";

const defaultPagination: TablePagination = {
	current_page: 0,
	limit: 20,
	total_flows: 0,
	total_pages: 0,
	next_page: 0,
};

// TODO: virtualization > pagination?; btn for auto-update?
const Table = () => {
	const [_, navigate] = useLocation();

	const [flows, setFlows] = useState<Flow[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagination, setPagination] =
		useState<TablePagination>(defaultPagination);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const doFetch = async () => {
		setIsLoading(true);
		const res = await getList(currentPage);
		setIsLoading(false);

		if (res.success) {
			setFlows(res.data);
			setPagination(res.pagination);
		} else {
			setError(res.reason);
			setFlows([]);
			setPagination(defaultPagination);
		}
	};

	const handleFlowClick = (flow_id: Flow["id"]) => {
		navigate(`/flows/${flow_id}`);
	};

	useEffect(() => {
		// TODO: handle abort + and race conditions
		doFetch();
		const intervalId = setInterval(() => { }, 10000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "100%",
				maxHeight: "100%",
				overflow: "hidden",
			}}
		>
			<TableContainer
				style={{
					width: "100%",
					maxWidth: "100%",
					maxHeight: "100%",
					overflow: "hidden",
				}}
				component={Paper}
				elevation={3}
			>
				<MUITable>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: 600 }}>Last Seen</TableCell>
							<TableCell sx={{ fontWeight: 600 }}>Source</TableCell>
							<TableCell sx={{ fontWeight: 600 }}>Destination</TableCell>
							<TableCell sx={{ fontWeight: 600 }}>Protocol</TableCell>
							<TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
						</TableRow>
					</TableHead>
					{isLoading && (
						<td colSpan={5} style={{ height: "75px" }}>
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
						</td>
					)}
					{!isLoading && error !== null && (
						<td colSpan={5} style={{ height: "75px", verticalAlign: "middle" }}>
							<Typography
								align="center"
								sx={{ fontWeight: 600 }}
								gutterBottom
								color="error"
							>
								{error}
							</Typography>
						</td>
					)}
					{!isLoading && error === null && (
						<TableBody>
							{flows.map((flow) => (
								<TableRow
									key={flow.id}
									hover
									onClick={() => handleFlowClick(flow.id)}
									sx={{
										cursor: "pointer",
										"&:hover": { backgroundColor: "action.hover" },
									}}
								>
									<TableCell>{flow.last_seen}</TableCell>
									<TableCell>
										<Box sx={{ display: "flex", alignItems: "center" }}>
											<FEATURE_FLAG.view.inline code={flow.src_country} />
											<Typography>
												{flow.src_ip}:{flow.src_port}
											</Typography>
										</Box>
									</TableCell>
									<TableCell>
										<Box sx={{ display: "flex", alignItems: "center" }}>
											<FEATURE_FLAG.view.inline code={flow.dst_country} />
											<Typography>
												{flow.dst_ip}:{flow.dst_port}
											</Typography>
										</Box>
									</TableCell>
									<TableCell>{flow.protocol}</TableCell>
									<TableCell>
										<FEATURE_CATEGORY.view.inline category={flow.category} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					)}
				</MUITable>
			</TableContainer>

			<Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
				<Pagination
					count={pagination.total_pages}
					page={currentPage}
					onChange={(_, page) => setCurrentPage(page)}
					color="primary"
					showFirstButton
					showLastButton
					disabled={isLoading || error !== null}
				/>
			</Box>
		</Box>
	);
};

export default Table;
