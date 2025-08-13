import Open from "./open";
import type { Model as OpenModels } from "./open";

import Closed from "./closed";
import type { Model as ClosedModels } from "./closed";

// FLAW: if a closed feature uses an open feature; or an open feature uses another open feature - they can't use $features and need relative imports from actual features to resolve the circular imports
export const $features = {
	open: Open,
	closed: Closed,
};

export interface Features {
	open: OpenModels;
	closed: ClosedModels;
}

export interface FeatureList {
	closed: ClosedModels[keyof ClosedModels]["self"];
}
