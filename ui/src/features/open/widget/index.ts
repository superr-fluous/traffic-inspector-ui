import view from "./view";

import { type Model as Default, type Config } from "./model";

export default {
	view,
};

export interface Model {
	self: "widget";
	default: Default;
	config: Config;
}
