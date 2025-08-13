import { $api } from "@services";
import type { Model, ViewList } from "../model";

export default {
	layout: (view: ViewList) => $api.get<Model>(`dashboard?type=${view}`),
};
