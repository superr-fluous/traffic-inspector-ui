import React, { useMemo, memo, useState, useRef, useEffect } from "react";
import type { ComponentProps, FC } from "react";
import equal from "fast-deep-equal";

import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

import { $helpers } from "@shared";

import { getWidgetVisual } from "../helpers";
import type { WidgetConfig, WidgetModel } from "../model";

import styles from "../styles.module.css";
import WidgetWizard from "./widget-wizard";

type Props = ComponentProps<"div"> & {
	widget: WidgetModel;
	onConfigure: (config: WidgetConfig) => void;
};

// FUTURE FLOW
// Widget is responsible for posting configuration to back-end
// so the only case when there is a rerender from `widget` it means that the `widget` reference has changed i.e. widgets were reloaded for example
// this way `widget.config` and its changes are bound to `<Widget>` and do not affect other widgets

const Widget: FC<Props> = ({ widget, className, onConfigure, ...props }) => {
	const [showWizard, setShowWizard] = useState(false);
	const view = useRef<ReturnType<typeof getWidgetVisual> | null>(null);

	useEffect(() => {
		// temporary workaround, so that `showWizard` is not off BEFORE `widget.config` is updated
		// right now `onConfigure` leads to creating new widget object (new reference) but in case the actual config values are the same this useEffect is needed
		setShowWizard(false);
	}, [widget]);

	useEffect(() => {
		console.log("visual effect");
		const visual = getWidgetVisual(widget.config);

		if (visual === null || visual === undefined) {
			setShowWizard(true);
			view.current = null;
		} else {
			setShowWizard(false);
			view.current = memo(visual, (prev, current) => equal(prev.config, current.config));
		}
	}, [widget.config.dataInfo, widget.config.dataSource]);

	return (
		<div {...props} id={widget.i} className={$helpers.clsx(className, styles["widget-container"])}>
			<div
				style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", paddingInline: "1rem" }}
			>
				<Typography variant='tableHeader'>{widget.name}</Typography>
				<Tooltip title='Edit configuration' placement='top'>
					<IconButton color='primary' size='small' onClick={() => setShowWizard(true)}>
						<SettingsIcon />
					</IconButton>
				</Tooltip>
			</div>
			<Divider />
			{showWizard && <WidgetWizard widget={widget} onConfirmConfiguration={onConfigure} />}
			{!showWizard && view.current && <view.current config={widget.config} />}
		</div>
	);
};

export default Widget;
