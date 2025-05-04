import Top from './views/top';
import Badge from './views/badge';

import type { Category } from "./model";

export default {
	view: {
		badge: Badge,
		chart: {
			top: Top,
		}
	},
};

export interface Model {
	enum: Category,
};
