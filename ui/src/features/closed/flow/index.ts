import Info from "./views/info";
import Table from "./views/table";
import Total from "./views/total";
import TotalOverTime from "./views/total-overtime";

import type { Flow, FlowDetailed } from "./model";

export default {
  view: {
    info: Info,
    table: Table,
    total: Total,
    chart: {
      totalOverTime: TotalOverTime,
    },
  },
};

export interface Model {
  default: Flow;
  detailed: FlowDetailed;
}
