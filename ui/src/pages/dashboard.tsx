import React from "react";

import Box from "@mui/material/Box";

import { $ui } from "@shared";
import { $features } from "@features";

import "./dashboard.css";

const toc = [
	{ label: "Total", id: "total", level: 1 },
	{ label: "Total Protocols", id: "protocols", level: 1 },
	{ label: "Total Categories", id: "categories", level: 1 },
	{ label: "Total IP Addresses", id: "ip", level: 1 },
	{ label: "Total Countries", id: "countries", level: 1 },
	{ label: "Top ASN", id: "asn", level: 1 },
	{ label: "Top OS", id: "os", level: 1 },
	{ label: "Top L4 Protocols", id: "l4", level: 1 },
];

const Dashboard = () => {
	return (
		<>
			<$features.open.country.view.flag code="RU" size="xl" />
			<$ui.tableOfContents contents={toc} />
			<$ui.pageHeader>Dashboard</$ui.pageHeader>

			<div id="total">
				<$features.closed.flow.view.total
					style={{ width: "100%", marginBlockEnd: "1rem" }}
				/>
			</div>

			<Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
				<div style={{ gridColumn: "span 2" }}>
					<$features.closed.flow.view.chart.totalOverTime />
				</div>
				<div id="protocols">
					<$features.open.protocol.view.chart.top />
				</div>
				<div id="categories">
					<$features.open.category.view.chart.top />
				</div>
				<div id="ip" style={{ gridColumn: "span 2" }}>
					<$features.open.ip.view.chart.top />
				</div>
				<div id="countries">
					<$features.open.country.view.chart.top />
				</div>
				<div id="asn">
					<$features.open.asn.view.chart.top />
				</div>
				<div id="os">
					<$features.open.os.view.chart.top />
				</div>
				<div id="l4">
					<$features.open.protocol.view.chart.topl4 />
				</div>
			</Box>
		</>
	);
};

export default Dashboard;
