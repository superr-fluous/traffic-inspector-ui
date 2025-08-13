import { $api } from "@services";

import type { Model, ViewList } from "../model";

export default {
	layout: (view: ViewList, layout: Model) => $api.post(`dashboard/${view}`, { body: JSON.stringify(layout) }),
};
