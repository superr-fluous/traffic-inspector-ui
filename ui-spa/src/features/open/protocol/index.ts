import { Info } from "./views";

import DNSInfo from "./shards/dns/view";
import type DNSModel from "./shards/dns/model";

import TLSInfo from "./shards/tls/view";
import type TLSModel from "./shards/tls/model";

export const FEATURE_PROTOCOL = {
	view: {
		info: {
			full: Info,
			dns: DNSInfo,
			tls: TLSInfo,
		},
	},
};

export type FEATURE_PROTOCOL_MODEL_DNS = DNSModel;
export type FEATURE_PROTOCOL_MODEL_TLS = TLSModel;
