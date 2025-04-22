import React from "react";
import type { FC, PropsWithChildren } from "react";

import { Scrollable } from "@shared/ui/scrollable";

import styles from "./styles.module.css";

const Page: FC<PropsWithChildren> = ({ children }) => (
	<Scrollable className={styles["page-container"]}>
		<div className={styles["page-content-wrapper"]}>{children}</div>
	</Scrollable>
);

export default Page;
