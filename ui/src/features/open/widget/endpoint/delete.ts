import { $api } from "@services";
import type { Model } from "../model";

export default {
	self: (id: Model["i"]) => $api.delete(`widgets/${id}`),
};
