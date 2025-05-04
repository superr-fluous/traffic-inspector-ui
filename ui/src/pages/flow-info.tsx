import React from "react";
import type { FC } from "react";

import { $ui } from "@shared";

import { $features } from "@features";
import type { Features } from "@features";

interface Props {
	flow_id: Features['closed']['flow']["default"]["id"];
}

const Page: FC<Props> = ({ flow_id }) => (
	<>
		<$ui.pageHeader>Network Flow Info</$ui.pageHeader>
		{flow_id !== undefined && <$features.closed.flow.view.info flow_id={flow_id} />}
	</>
);

export default Page;
