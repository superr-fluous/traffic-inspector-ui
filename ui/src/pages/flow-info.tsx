import React from "react";
import Typography from "@mui/material/Typography";

import type { FC } from "react";

import { FEATURE_FLOW } from "@features/closed/flow";
import type { FEATURE_FLOW_MODEL } from "@features/closed/flow";

interface Props {
	flow_id: FEATURE_FLOW_MODEL["default"]["id"];
}

const Page: FC<Props> = ({ flow_id }) => (
	<div
		className="container mx-auto"
		style={{
			width: "75%",
			height: "100%",
			maxWidth: "75%",
			maxHeight: "100%",
		}}
	>
		<Typography variant="h5" component="h1" marginTop={3}>
			Network Flow Info
		</Typography>
		{flow_id !== undefined && <FEATURE_FLOW.view.info flow_id={flow_id} />}
	</div>
);

export default Page;
