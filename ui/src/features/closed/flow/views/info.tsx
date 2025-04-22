import React, { useEffect, useState } from "react";
import type { FC } from "react";

import Typography from "@mui/material/Typography";

import { Loader } from "@shared/ui/loader";

import { FEATURE_PROTOCOL } from "@features/open/protocol";

import { getFlow } from "../endpoint/query";
import { ByteRatioBar } from "../ui/byte-ratio-bar";
import { TcpIpLayers } from "../ui/tcp-ip-layers";

import type { Flow, FlowDetailed } from "../model";

interface Props {
	flow_id: Flow["id"];
}

const mock: FlowDetailed = {
	id: "1",
	src_ip: "localhost",
	src_port: 4000,
	src_country: "ru",
	dst_ip: "10.11.1.2",
	dst_port: 443,
	dst_country: "ru",
	category: "VPN",
	protocol: "HTTPS",
	last_seen: "2025-04-23 12:00:00",
	src_mac: "MAC",
	dst_mac: "MAC",
	ipv: 4,
	tcp_fingerprint: "try hole but finger",
	src_os: "os",
	dst_os: "os",
	// TODO: proto? Flow['protocol']?
	proto: "proto",
	src_as: "src_as",
	dst_as: "dst_as",
	first_seen: "first_seen",
	src_num_pkts: 1200,
	dst_num_pkts: 500,
	src_len_pkts: 1232130,
	dst_len_pkts: 21312,
	ndpi: {
		tls: {
			tls_supported_versions: "TLSv1.3",
			ja4: "ja4",
			ja3s: "ja3s",
			blocks: 3,
			cipher: "cipher",
			version: "version",
			issuerDN: "issuerDN",
			subjectDN: "subjectDN",
			fingerprint: "fingerpint",
			server_names: "server_names",
			unsafe_cipher: 1,
			negotiated_alpn: "negotiated_alpn",
			advertised_alpns: "advertised_apns",
		},
		dns: {
			rsp_addr: ["response"],
			rsp_type: 1,
			query_type: 1,
			reply_code: 1,
			num_answers: 2,
			num_queries: 3,
		},
		breed: "breed",
		proto: "proto",
		category: "category",
		hostname: "hostname",
		proto_id: "proto_id",
		domainame: "string",
		encrypted: 1,
		// flow_risk: { "6": {} },
		//confidence: {
		//		"6": {},
		//},
		category_id: 6,
		proto_by_ip: "21",
		proto_by_ip_id: 1,
	},
};

const Info: FC<Props> = ({ flow_id }) => {
	const [data, setData] = useState<FlowDetailed | null>(mock);
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
		// doFetch();
	}, [flow_id]);

	return (
		<>
			{isLoading && <Loader size={52} thickness={3} />}
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
				</div>
			)}
		</>
	);
};

export default Info;
