import React from "react";
import type { FC, PropsWithChildren } from "react";

import { $ui } from "@shared";

import styles from "./styles.module.css";

const Page: FC<PropsWithChildren> = ({ children }) => (
  <$ui.scrollable className={styles["page-container"]}>
    <div className={styles["page-content-wrapper"]}>{children}</div>
  </$ui.scrollable>
);

export default Page;
