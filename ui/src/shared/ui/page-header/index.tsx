import React from "react";
import type { FC, PropsWithChildren } from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { COLORS } from "@layout/theme";

const PageHeader: FC<PropsWithChildren> = ({ children }) => (
  <Typography variant="pageHeader" sx={{ position: "relative" }}>
    {children}
    <Divider
      sx={{
        "&::after": {
          content: '""', // https://github.com/mui/material-ui/issues/14153#issuecomment-453605145
          width: "8px",
          height: "8px",
          borderRadius: "10px",
          background: COLORS.secondary,
          position: "absolute",
          bottom: "-3px",
          right: 0,
        },
      }}
    />
  </Typography>
);

export default PageHeader;
