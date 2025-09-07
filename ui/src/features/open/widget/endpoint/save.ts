import { $api } from "@services";
import { Model } from "../model";

type SaveParams = Partial<Omit<Model, "i" | "bookmarked">>

export default {
	self: (id: Model["i"], params: SaveParams) => $api.patch(`widgets/${id}`, { body: JSON.stringify(params) }),
	bookmark: (id: Model["i"], state: Model["bookmarked"]) => $api.patch(`widgets/${id}/${state}`),
};
