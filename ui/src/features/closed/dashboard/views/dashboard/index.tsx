import React, { useState } from "react";

import type { FC } from "react";

import { $hooks, $ui } from "@shared";

import _endpoint from "../../endpoint";
import type { Model } from "../../model";

import Toolbar from "./widgets/toolbar";
import ManagePanel from "./widgets/manage-panel";


import styles from "../shared/styles.module.css";

interface Props {}

const Dashboard: FC<Props> = ({}) => {
	const [layout, setLayout] = useState<Model>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<null | string>(null);

	const doFetch = async () => {
		setIsLoading(true)
		const res = await _endpoint.query.fetch.self()

		if (res.ok) {
			setLayout(_endpoint.adapters.dto.incoming.self(res.data))
		}

		setIsLoading(false)
	}

	$hooks.useOnce(doFetch)

	return (
		<$ui.loader className={styles.wrapper} loading={isLoading} error={error}>
			<Toolbar />

			<$ui.scrollable className={styles["grid-layout-wrapper"]}>
				<$ui.sinks.widgetPanel layout={layout} />
			</$ui.scrollable>
		</$ui.loader>
	);
};

export default Dashboard;
 