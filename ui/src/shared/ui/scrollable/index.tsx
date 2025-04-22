import React from "react";
import type { ComponentProps, FC, PropsWithChildren } from "react";

import clsx from "@shared/helpers/clsx";

import styles from "./styles.module.css";

type Props = ComponentProps<"div"> & PropsWithChildren;

export const Scrollable: FC<Props> = ({ children, className, ...props }) => (
	<div {...props} className={clsx([styles.scrollable, className])}>
		{children}
	</div>
);
