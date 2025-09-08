import React, { memo, useEffect, useRef, useState } from "react";
import equal from "fast-deep-equal";
import type { FC } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { $helpers } from "@shared";

import _helpers from "../../../../../../utilities";
import type { GenericWidgetPreviewProps, Model } from "../../../../../../model";

import type { Form } from "../form";

import styles from "./styles.module.css";

interface Props {
	id: Model["i"];
	className?: string;
	values: Partial<Form>;
}

const Shard: FC<Props> = ({ values, className, id }) => {
	const view = useRef<ReturnType<typeof _helpers.mappers.widgetVisual> | null>(null);
	const [config, setConfig] = useState<Partial<Form>>();

	const onConfigReceive = (config: Partial<Form>) => {
		const visual = _helpers.mappers.widgetVisual(config.dataInfo, config.dataVisual);
		if (visual === null || visual === undefined) {
			view.current = null;
		} else {
			view.current = memo(visual, (prev, current) => equal(prev, current));
		}

		setConfig(config);
	};

	useEffect(() => {
		onConfigReceive(values);
	}, [values]);

	return (
		<Box className={$helpers.clsx(styles["preview-container"], className)}>
			<Typography variant='baseXl'>Preview</Typography>
			<div className={styles["widget-container"]}>
				{view.current === null && <Typography variant='baseXl'>Configure widget</Typography>}
				{view.current !== null && (
					<view.current
						dataInfo={values.dataInfo!}
						dataSource={values.dataSource!}
						dataVisual={values.dataVisual!}
						config={values.config!}
						filters={values.filters!}
					/>
				)}
			</div>
		</Box>
	);
};

const eqFn = (prev: Props, current: Props) =>
	prev.className === current.className &&
	prev.values.dataInfo === current.values.dataInfo &&
	prev.values.dataSource === current.values.dataSource &&
	prev.values.dataVisual === current.values.dataVisual;

export default memo(Shard, eqFn);
