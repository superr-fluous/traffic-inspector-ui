import Top from "./views/top";
import Info from "./views/info";
import TopL4 from "./views/top-l4";

import DNSInfo from "./shards/dns/view";
import type DNSModel from "./shards/dns/model";

import TLSInfo from "./shards/tls/view";
import type TLSModel from "./shards/tls/model";

import type { Protocol } from './model';

export default {
	view: {
		info: {
			full: Info,
			dns: DNSInfo,
			tls: TLSInfo,
		},
		chart: {
			top: Top,
			topl4: TopL4,
		}
	},
};

export interface Model {
	dns: DNSModel,
	tls: TLSModel,
	enum: Protocol,
}

