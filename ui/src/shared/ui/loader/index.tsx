import React from "react";
import type { FC, ComponentProps } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import type { CircularProgressProps } from "@mui/material/CircularProgress";

import { COLORS } from "@layout/theme";

type Props = ComponentProps<"div"> & CircularProgressProps;

const Loader: FC<Props> = ({ size = 32, thickness = 2, ...divProps }) => (
  <div
    {...divProps}
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      backgroundColor: "transparent",
      ...divProps.style,
    }}
  >
    <CircularProgress
      style={{ color: COLORS.accent }}
      size={size}
      thickness={thickness}
    />
  </div>
);

export default Loader;
