import React from "react";
import clsx from "@shared/helpers/clsx";
import type { ComponentProps, FC, PropsWithChildren } from "react";

import styles from "./styles.module.css";

type Props = PropsWithChildren<ComponentProps<"div">> & {
	show: boolean;
};

const Overlay: FC<Props> = ({ show, children, className, ...props }) => (
	<div {...props} className={clsx(styles.overlay, show && styles.show, className)}>
		{children}
	</div>
);

export default Overlay;
