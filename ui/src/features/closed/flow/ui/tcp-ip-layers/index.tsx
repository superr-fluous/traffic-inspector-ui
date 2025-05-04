import React from "react";
import type { FC } from "react";

import Box from "@mui/material/Box";
import LayersIcon from "@mui/icons-material/Layers";

import { $ui } from "@shared";

import Components from "./components";
import type { FlowDetailed } from "../../model";

interface Props {
	flow: FlowDetailed;
}

export const TcpIpLayers: FC<Props> = ({ flow }) => (
	<Box
		sx={{
			border: "1px solid var(--disabled)",
			borderRadius: 2,
			p: 2,
			display: "flex",
			flexDirection: "column",
			gap: 2.5,
		}}
	>
		<$ui.blockHeader title="TCP/IP" icon={LayersIcon} />

		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 2,
			}}
		>
			{/* Source Block */}
			<Components.Layers
				ipv={flow.ipv}
				proto={flow.proto}
				ip={flow.src_ip}
				mac={flow.src_mac}
				port={flow.src_port}
			/>

			<Components.As
				dst_as={flow.dst_as}
				dst_country={flow.dst_country}
				src_as={flow.src_as}
				src_country={flow.src_country}
			/>

			{/* Destination Block  */}
			<Components.Layers
				ipv={flow.ipv}
				proto={flow.proto}
				ip={flow.dst_ip}
				mac={flow.dst_mac}
				port={flow.dst_port}
			/>
		</Box>
	</Box>
);
