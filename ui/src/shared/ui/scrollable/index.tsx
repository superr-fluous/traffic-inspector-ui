import React from "react";
import type { ComponentProps, FC, PropsWithChildren } from "react";

import { $helpers } from "@shared";

import styles from "./styles.module.css";

type Props = ComponentProps<"div"> & PropsWithChildren;

const Scrollable: FC<Props> = ({ children, className, ...props }) => (
	<div {...props} className={$helpers.clsx([styles.scrollable, className])}>
		{children}
	</div>
);

export default Scrollable;
