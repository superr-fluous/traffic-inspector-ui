import React from "react";

import Typography from "@mui/material/Typography";

import { $ui } from "@shared";
import { $features } from "@features";
import PageWrapper from "@layout/page";

const Page = () => {
	return (
		<PageWrapper paddingBlock='xl' style={{ overflowX: "hidden", gap: "2rem", paddingInline: "4rem" }}>
			<$ui.pageHeader>
				<>
					<Typography variant='h4'>Widgets</Typography>
					<Typography variant='baseXl'>Create new and manage existing widgets</Typography>
				</>
			</$ui.pageHeader>

			<$features.open.widget.view.manage />
		</PageWrapper>
	);
};

export default Page;
