import { $api } from "@services";
import type { Model } from "../model";

export default {
	self: () => $api.put<Model["i"]>("widgets/"),
};
