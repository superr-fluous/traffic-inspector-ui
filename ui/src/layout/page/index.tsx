import React from "react";
import type { FC, PropsWithChildren } from "react";

import styles from "./styles.module.css";

const Page: FC<PropsWithChildren> = ({ children }) => (
	<div className={styles["page-wrapper"]}>{children}</div>
);

export default Page;
