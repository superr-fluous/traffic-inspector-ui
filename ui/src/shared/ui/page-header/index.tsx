import React from "react";
import type { FC, PropsWithChildren } from "react";

import Typography from "@mui/material/Typography";

export const PageHeader: FC<PropsWithChildren> = ({ children }) => (
  <Typography variant="pageHeader">{children}</Typography>
);
