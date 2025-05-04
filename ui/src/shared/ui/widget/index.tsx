import React from "react";
import type { FC, PropsWithChildren, ReactNode, CSSProperties } from "react";

import Typography from "@mui/material/Typography";

import styles from "./styles.module.css";

interface Props extends PropsWithChildren {
  header: ReactNode;
  size?: { w?: CSSProperties["width"]; h?: CSSProperties["height"] };
}

const Widget: FC<Props> = ({
  header,
  size = { w: "16rem", h: "24rem" },
  children,
}) => {
  const width = size.w ?? "16rem";
  const height = size.h ?? "24rem";

  return (
    <div
      className={styles["widget-container"]}
      style={{ width, height, maxWidth: width, maxHeight: height }}
    >
      <Typography variant="blockHeader">{header}</Typography>
      <div className={styles["widget-wrapper"]}>{children}</div>
    </div>
  );
};

export default Widget;
