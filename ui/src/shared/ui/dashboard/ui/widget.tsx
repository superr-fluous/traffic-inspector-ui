import React from "react";
import type { ComponentProps, FC } from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { $helpers } from "@shared";

import type { WidgetModel } from "../model";

import styles from "../styles.module.css";

type Props = ComponentProps<"div"> & {
	widget: WidgetModel;
};

const Widget: FC<Props> = ({ widget, className, ...props }) => (
	<div {...props} id={widget.i} className={$helpers.clsx(className, styles["widget-container"])}>
		<Typography variant='tableHeader'>{widget.name}</Typography>
		<Divider />
		<div className={styles["widget-wrapper"]}>{widget.children}</div>
	</div>
);

export default Widget;
