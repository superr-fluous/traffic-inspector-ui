import list from "./list";
import wizard from "./wizard";

import type { Props as ListProps } from "./list";

export default { list, wizard };

export interface Props {
	list: ListProps;
}
