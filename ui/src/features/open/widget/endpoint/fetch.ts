import { $api } from "@services";
import { Config, Model } from "../model";

export default {
	profile: (id: Model["i"]) => $api.get<Model>(`widget/${id}`),
};
