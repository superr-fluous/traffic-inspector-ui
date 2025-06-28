import Open from './open';
import type { Model as OpenModels } from './open';

import Closed from './closed';
import type { Model as ClosedModels } from './closed';

export const $features = {
	open: Open,
	closed: Closed,
}

export interface Features {
	open: OpenModels,
	closed: ClosedModels,
}
