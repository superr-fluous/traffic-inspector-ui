import { $api } from "@services";
import { Config, Model } from "../model";

export default {
	config: (id: Model["i"], config: Config) => $api.post(`widget/${id}/config`, { body: JSON.stringify(config) }),
	name: (id: Model["i"], name: string) => $api.post(`widget/${id}/name`, { body: JSON.stringify({ name }) }),
};
