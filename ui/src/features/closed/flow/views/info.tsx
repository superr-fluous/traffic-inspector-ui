import React, { useEffect, useState } from "react";
import type { FC } from "react";

import Typography from "@mui/material/Typography";

import { $ui } from "@shared";
import { $features } from "@features";

import { getFlow } from "../endpoint/query";
import { ByteRatioBar } from "../ui/byte-ratio-bar";
import { TcpIpLayers } from "../ui/tcp-ip-layers";

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
		<>
			{isLoading && <$ui.loader size={52} thickness={3} />}
			{!isLoading && error !== null && (
				<Typography align="center" gutterBottom variant="error">
					{error}
				</Typography>
			)}
			{!isLoading && error === null && data !== null && (
				<div
					style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
				>
					{/* Connection Flow Section */}
					<ByteRatioBar
						source={data.src_len_pkts}
						destination={data.dst_len_pkts}
					/>

					<TcpIpLayers flow={data} />

					<$features.open.protocol.view.info.full
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
						<$features.open.protocol.view.info.tls details={data.ndpi.tls} />
					)}

					{data.ndpi.dns && (
						<$features.open.protocol.view.info.dns details={data.ndpi.dns} />
					)}
				</div>
			)}
		</>
	);
};

export default Info;
