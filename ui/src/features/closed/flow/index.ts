import Table from "./views/table";
import Info from "./views/info";
import type { Flow, FlowDetailed } from "./model";

export const FEATURE_FLOW = {
	view: {
		table: Table,
		info: Info,
	},
};

export interface FEATURE_FLOW_MODEL {
	default: Flow;
	detailed: FlowDetailed;
}
