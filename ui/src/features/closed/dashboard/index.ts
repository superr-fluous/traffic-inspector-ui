import _endpoint from './endpoint';

import dashboard from "./views/dashboard";
import statistics from "./views/statistics";

import { Model as Default } from "./model";

export default {
	views: {
		dashboard,
		statistics, // should not really be called 'statistics' i guess
	},
};

export const endpoint = {
	fetch: {
		data: _endpoint.query.fetch.data,
		preview: _endpoint.query.fetch.preview,
	}
}

export interface Model {
	default: Default;
	self: "dashboard";
}
