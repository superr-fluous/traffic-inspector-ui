import flow from "./flow";
import type { Model as FlowModel } from "./flow";

import dashboard from "./dashboard";
import type { Model as DashboardModel } from "./dashboard";

export default {
	flow,
	dashboard,
};

export interface Model {
	flow: FlowModel;
	dashboard: DashboardModel;
}
