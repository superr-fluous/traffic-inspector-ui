import React from "react";
import Typography from "@mui/material/Typography";

import { FEATURE_FLOW } from "@features/closed/flow";

const Page = () => (
	<div
		className="container mx-auto"
		style={{
			width: "75%",
			height: "100%",
			maxWidth: "75%",
			maxHeight: "100%",
		}}
	>
		<Typography
			variant="h5"
			style={{ color: "#faf0e6" }}
			component="h1"
			marginTop={3}
		>
			Network Flows
		</Typography>
		<FEATURE_FLOW.view.table />
	</div>
);

export default Page;
