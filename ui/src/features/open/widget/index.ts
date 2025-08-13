import view from "./view";
import endpoint from "./endpoint";

import { type Model as Default, type Config } from "./model";

export default {
	view,
	endpoint: {
		save: {
			name: endpoint.save.name,
		},
	},
};

export interface Model {
	self: "widget";
	default: Default;
	config: Config;
}
