import { $api } from "@services";
import { Config, Model } from "../model";

export default {
	self: (id: Model["i"]) => $api.get<Model>(`widgets/${id}`),
	all: () => $api.get<Model[]>("widgets/all"),
};
