import React from "react";
import Typography from "@mui/material/Typography";

import { FEATURE_FLOW } from "@features/closed/flow";

const Page = () => {
	// вынести верхний div выше
	return (
		<div
			style={{
				width: "100%",
				maxWidth: "100%",
				height: "100%",
				maxHeight: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
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
					Network Flows
				</Typography>
				<FEATURE_FLOW.view.table />
			</div>
		</div>
	);
};

export default Page;
