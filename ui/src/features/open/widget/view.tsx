import React, { memo, useState, useRef, useEffect } from "react";
import type { ComponentProps, FC } from "react";
import equal from "fast-deep-equal";

import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

import { $helpers, $hooks, $ui } from "@shared";

import { getWidgetVisual } from "./utilities/mappers";
import { Config, Model } from "./model";
import WidgetWizard from "./shards/wizard";

import _endpoint from "./endpoint";

import styles from "./styles.module.css";

type Props = ComponentProps<"div"> & {
	id: Model["i"];
	// onConfigure: (config: Config) => void;
};

// FUTURE FLOW
// Widget is responsible for posting configuration to back-end
// so the only case when there is a rerender from `widget` it means that the `widget` reference has changed i.e. widgets were reloaded for example
// this way `widget.config` and its changes are bound to `<Widget>` and do not affect other widgets

const Widget: FC<Props> = ({ id, className, ...props }) => {
	const [showWizard, setShowWizard] = useState(false);
	const [name, setName] = useState<Model["name"] | null>(null);
	const [config, setConfig] = useState<Model["config"] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const view = useRef<ReturnType<typeof getWidgetVisual> | null>(null);

	const onConfigReceive = (config: Config) => {
		const visual = getWidgetVisual(config);

		if (visual === null || visual === undefined) {
			setShowWizard(true);
			view.current = null;
		} else {
			setShowWizard(false);
			view.current = memo(visual, (prev, current) => equal(prev.config, current.config));
		}

		setConfig(config);
	};

	const doFetch = () => {
		_endpoint.fetch
			.profile(id)
			.then((res) => {
				if (res.ok) {
					onConfigReceive(res.data.config);
					setName(res.data.name);
				} else {
					setConfig(null);
					setName(null);
					setError(res.error);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const doSave = (config: Config) => {
		setIsLoading(true);
		_endpoint.save
			.config(id, config)
			.then((res) => {
				if (!res.ok) {
					setError(res.error);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	$hooks.useOnce(doFetch);

	return (
		<div {...props} id={id} className={$helpers.clsx(className, styles["widget-container"])}>
			{isLoading && <$ui.loader loading error={error} />}

			{!isLoading && config === null && <Typography variant='error'>Unknown error</Typography>}
			{!isLoading && config !== null && (
				<>
					<div
						style={{
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "space-between",
							paddingInline: "1rem",
						}}
					>
						<Typography variant='tableHeader'>{name}</Typography>
						<Tooltip title='Edit configuration' placement='top'>
							<IconButton color='primary' size='small' onClick={() => setShowWizard(true)}>
								<SettingsIcon />
							</IconButton>
						</Tooltip>
					</div>
					<Divider />
					{showWizard && <WidgetWizard config={config} onConfirmConfiguration={doSave} />}
					{!showWizard && view.current && <view.current config={config} />}
				</>
			)}
		</div>
	);
};

export default Widget;
