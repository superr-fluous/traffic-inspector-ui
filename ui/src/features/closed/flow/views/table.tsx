import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

import Paper from "@mui/material/Paper";
import MUITable from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import TableContainer from "@mui/material/TableContainer";

import { $ui } from "@shared";
import { $features } from "@features";

import { getList, type TablePagination } from "../endpoint/query";
import type { Flow } from "../model";

const defaultPagination = {
	current_page: 1,
	limit: 20,
	total_flows: 1,
	total_pages: 1,
	next_page: 1,
};

// TODO: virtualization > pagination?; btn for auto-update?
const Table = () => {
	const [_, navigate] = useLocation();

	const [flows, setFlows] = useState<Flow[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagination, setPagination] = useState<TablePagination>(defaultPagination);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const doFetch = async (signal: AbortSignal) => {
		setIsLoading(true);
		const res = await getList(currentPage, 20, signal);
		console.log(res);
		setIsLoading(false);

		if (res.ok) {
			setError(null);
			setFlows(res.data.data);
			setPagination(res.data.pagination);
		} else {
			setError(res.error);
			setFlows([]);
			setPagination(defaultPagination);
		}
	};

	const handleFlowClick = (flow_id: Flow["id"]) => {
		navigate(`/flows/${flow_id}`);
	};

	useEffect(() => {
		const ctrl = new AbortController();

		doFetch(ctrl.signal);
		const intervalId = setInterval(() => {
			doFetch(ctrl.signal);
		}, 30000);

		return () => {
			ctrl.abort();
			clearInterval(intervalId);
		};
	}, []);

	return (
		<>
			<TableContainer component={Paper} elevation={3}>
				<MUITable>
					<TableHead>
						<TableRow>
							<TableCell>
								<Typography variant='tableHeader'>Last Seen</Typography>
							</TableCell>
							<TableCell>
								<Typography variant='tableHeader'>Source</Typography>
							</TableCell>
							<TableCell>
								<Typography variant='tableHeader'>Destination</Typography>
							</TableCell>
							<TableCell>
								<Typography variant='tableHeader'>Protocol</Typography>
							</TableCell>
							<TableCell>
								<Typography variant='tableHeader'>Category</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					{isLoading && (
						<td colSpan={5} style={{ height: "72px" }}>
							<$ui.loader size={52} thickness={3} />
						</td>
					)}
					{!isLoading && error !== null && (
						<td
							colSpan={5}
							style={{
								height: "72px",
								verticalAlign: "middle",
								textAlign: "center",
							}}
						>
							<Typography align='center' gutterBottom variant='error'>
								{error}
							</Typography>
						</td>
					)}
					{!isLoading && error === null && (
						<TableBody>
							{flows.map((flow) => (
								<TableRow key={flow.id} hover onClick={() => handleFlowClick(flow.id)}>
									<TableCell>
										<Typography variant='tableCell'>{flow.last_seen}</Typography>
									</TableCell>
									<TableCell>
										<div
											style={{
												display: "inline-flex",
												justifyContent: "center",
												gap: "0.4rem",
											}}
										>
											<$features.open.country.view.flag code={flow.src_country} />
											<Typography variant='tableCell'>
												{flow.src_ip}:{flow.src_port}
											</Typography>
										</div>
									</TableCell>
									<TableCell>
										<div
											style={{
												display: "inline-flex",
												justifyContent: "center",
												gap: "0.4rem",
											}}
										>
											<$features.open.country.view.flag code={flow.dst_country} />
											<Typography variant='tableCell'>
												{flow.dst_ip}:{flow.dst_port}
											</Typography>
										</div>
									</TableCell>
									<TableCell>
										<Typography variant='tableCell'>{flow.protocol}</Typography>
									</TableCell>
									<TableCell>
										<$features.open.category.view.badge category={flow.category} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					)}
				</MUITable>
			</TableContainer>
			<Pagination
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					width: "100%",
					paddingBlock: "0.25rem",
				}}
				count={pagination.total_pages}
				page={currentPage}
				onChange={(_, page) => setCurrentPage(page)}
				showFirstButton
				showLastButton
				disabled={isLoading || error !== null}
				size='large'
			/>
		</>
	);
};

export default Table;

