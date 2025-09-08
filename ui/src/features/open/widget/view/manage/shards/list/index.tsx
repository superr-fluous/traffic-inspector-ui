import React, { FC, useState } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import { $hooks, $ui } from "@shared";

import _endpoint from "../../../../endpoint";
import type { Model } from "../../../../model";
import { Switch } from "@mui/material";

export interface Props {
	actionHandlers: {
		add: () => Promise<boolean>;
		edit: (id: Model["i"]) => Promise<boolean>;
		delete: (id: Model["i"]) => Promise<boolean>;
		toggle: (id: Model["i"]) => Promise<boolean>;
	};
}

interface ExecActionParams {
	cb: (...args: any[]) => Promise<boolean>;
	cbArgs?: any[];
	successCb?: (...args: any[]) => void;
	sucessCbArgs?: any[];
	failureCb?: (...args: any[]) => void;
	failureCbArgs?: any[];
}

const execAction = async (cfg: ExecActionParams) => {
	const res = await cfg.cb(...(cfg.cbArgs ?? []));

	if (res && cfg.successCb) {
		cfg.successCb(...(cfg.sucessCbArgs ?? []));
	}

	if (!res && cfg.failureCb) {
		cfg.failureCb(...(cfg.failureCbArgs ?? []));
	}
};

const mock: Model[] = [
	{
		'i': "1",
		"name": "Default widget",
		"bookmarked": false,
		"dataInfo": "country",
		"dataSource": "flows",
		"dataVisual": "line",
		"filters": {},
		"config": {},
	}
]

const View: FC<Props> = ({ actionHandlers }) => {
	const [rows, setRows] = useState<Model[]>(mock);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const doFetch = async () => {
		setIsLoading(true);
		const res = await _endpoint.fetch.all();

		if (res.ok) {
			setRows(res.data);
		}

		setIsLoading(false);
	};

	const editWidget = (id: Model["i"]) => {
		execAction({ cb: actionHandlers.edit, cbArgs: [id], successCb: doFetch });
	};

	const deleteWidget = (id: Model["i"]) => {
		execAction({ cb: actionHandlers.delete, cbArgs: [id], successCb: doFetch });
	};

	const addWidget = () => {
		execAction({ cb: actionHandlers.add, cbArgs: [], successCb: doFetch });
	};

	const toggleWidget = (id: Model["i"]) => {
		execAction({ cb: actionHandlers.toggle, cbArgs: [id], successCb: doFetch })
	}

	$hooks.useOnce(doFetch);

	return (
		<>
			<Button variant='contained' onClick={addWidget}>
				Create widget
			</Button>

			<TableContainer component={Paper}>
				<$ui.loader loading={isLoading} error={error}>
					<Table sx={{ minWidth: 650 }} aria-label='Existing widgets table'>
						<TableHead>
							<TableRow>
								<TableCell align="left">Enabled</TableCell>
								<TableCell>Name</TableCell>
								<TableCell align='right'>Source</TableCell>
								<TableCell align='right'>Type</TableCell>
								<TableCell align='right'>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody sx={{ minHeight: "8rem" }}>
							{rows.map((row) => (
								<TableRow
									hover={false}
									key={row.i}
									sx={{
										"&:last-child td, &:last-child th": { border: 0 },
										width: "100%",
									}}
								>
									<TableCell>
										<Switch checked={row.bookmarked} onChange={() => toggleWidget(row.i)} />
									</TableCell>
									<TableCell align='right'color='info' component='th' scope='row'>
										{row.name}
									</TableCell>
									<TableCell align='right' style={{ textTransform: "capitalize" }}>
										{row.dataInfo}
									</TableCell>
									<TableCell align='right' style={{ textTransform: "capitalize" }}>
										{row.dataVisual}
									</TableCell>
									<TableCell align='right'>
										<Button variant='text' color='primary' onClick={() => editWidget(row.i)}>
											Edit
										</Button>
										<Button
											variant='text'
											color='error'
											style={{ color: "#d32f2f !important" }}
											onClick={() => deleteWidget(row.i)}
										>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</$ui.loader>
			</TableContainer>
		</>
	);
};

export default View;
