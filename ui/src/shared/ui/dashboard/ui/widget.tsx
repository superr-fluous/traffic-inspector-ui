import React, { useMemo, memo } from "react";
import type { ComponentProps, FC } from "react";
import equal from "fast-deep-equal";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { $helpers } from "@shared";

import type { WidgetConfig, WidgetModel } from "../model";

import styles from "../styles.module.css";
import { getWidgetVisual } from "../helpers";
import Button from "@mui/material/Button";

type Props = ComponentProps<"div"> & {
	widget: WidgetModel;
	onConfigure: (config: WidgetConfig) => void;
};

type VisualProps = {
	widget: WidgetModel;
};

const equalProps = (prev: Props, current: Props) =>
	prev.id === current.id && prev.className === current.className && equal(prev.widget, current.widget);

const Widget: FC<Props> = ({ widget, className, onConfigure, ...props }) => {
	const Visual = useMemo(
		() =>
			memo(getWidgetVisual(widget.config)!, (prev, current) =>
				equal((prev as VisualProps).widget, (current as VisualProps).widget)
			),
		[widget.config.dataInfo, widget.config.dataVisual]
	);

	return (
		<div {...props} id={widget.i} className={$helpers.clsx(className, styles["widget-container"])}>
			<Typography variant='tableHeader'>{widget.name}</Typography>
			<Divider />
			{Visual && <Visual widget={widget} onConfirmConfiguration={onConfigure} />}
		</div>
	);
};

export default Widget;
