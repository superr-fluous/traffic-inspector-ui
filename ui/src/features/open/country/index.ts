import Top from "./views/top";
import Flag from "./views/flag";

import type { CountryCode } from "./model";

export default {
	view: {
		flag: Flag,
		chart: {
			top: Top,
		},
	},
};

export interface Model {
	enum: CountryCode;
};
