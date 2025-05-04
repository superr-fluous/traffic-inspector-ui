import Flow from './flow';
import type { Model as FlowModel } from './flow';

export default {
	flow: Flow,
};

export interface Model {
	flow: FlowModel,
};
