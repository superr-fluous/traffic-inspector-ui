import React from "react";
import type { CSSProperties, FC, PropsWithChildren } from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

interface Props extends PropsWithChildren {
	style?: CSSProperties;
}

const PageHeader: FC<Props> = ({ children, style }) => (
	<Typography variant='pageHeader' sx={{ width: "100%" }} style={style}>
		{children}
		<Divider
			sx={{
				marginBlockStart: "1rem",
			}}
		/>
	</Typography>
);

export default PageHeader;
