import type { FEATURE_FLAG_MODEL_CODE } from "@features/open/flag";
import type { FEATURE_CATEGORY_MODEL } from "@features/open/category";
import type {
	FEATURE_PROTOCOL_MODEL_DNS,
	FEATURE_PROTOCOL_MODEL_TLS,
} from "@features/open/protocol";

export interface Flow {
	id: string;
	last_seen: string;
	src_ip: string;
	dst_ip: string;
	src_port: number;
	dst_port: number;
	src_country: FEATURE_FLAG_MODEL_CODE;
	dst_country: FEATURE_FLAG_MODEL_CODE;
	protocol: string;
	category: FEATURE_CATEGORY_MODEL;
}

interface FlowRisk {
	risk: string;
	severity: string;
	risk_score: {
		total: number;
		client: number;
		server: number;
	};
}

export interface FlowDetailed extends Flow {
	src_mac: string;
	dst_mac: string;
	ipv: number;
	tcp_fingerprint: string;
	src_os: string;
	dst_os: string;
	// TODO: proto? Flow['protocol']?
	proto: string;
	src_as: string;
	dst_as: string;
	first_seen: string;
	last_seen: string;
	src_num_pkts: number;
	dst_num_pkts: number;
	src_len_pkts: number;
	dst_len_pkts: number;
	ndpi: {
		tls: FEATURE_PROTOCOL_MODEL_TLS;
		dns: FEATURE_PROTOCOL_MODEL_DNS;
		breed: string;
		proto: string;
		category: string;
		hostname: string;
		proto_id: string;
		domainame: string;
		encrypted: number;
		flow_risk: Record<string, FlowRisk>;
		confidence: Record<string, string>;
		category_id: number;
		proto_by_ip: string;
		proto_by_ip_id: number;
	};
}
