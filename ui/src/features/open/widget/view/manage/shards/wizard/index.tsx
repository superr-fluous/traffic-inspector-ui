import React, { useEffect, useState } from "react";
import type { FC } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { COLORS } from "@layout/theme";

import _endpoint from "../../../../endpoint";
import _shards from "./shards";

import type { Form } from "./shards/form";
import type { Model } from "../../../../model";

import styles from "./styles.module.css";

interface Props {
	id: Model["i"] | null;
	onConfirmConfiguration: VoidFunction;
	onBack: VoidFunction;
}

const Shard: FC<Props> = ({ id, onConfirmConfiguration, onBack }) => {
	const [form, setForm] = useState<Partial<Form>>({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const finish = async() => {
		doSave(id!, form).then((ok) => {
			if (ok) {
				onConfirmConfiguration();
				setForm({});
			}
		});
	};

	const setFormValue = <T extends keyof Form>(key: T, value: Form[T]) => {
		setForm((current) => ({ ...current, [key]: value }));
	};

	const doSave = async (i: Model["i"], values: Partial<Form>) => {
		setIsLoading(true);
		const res = await _endpoint.save.self(i, values);
		setIsLoading(false);

		return res.ok;
	};

	const doFetch = async (i: Model["i"]) => {
		setIsLoading(true);
		setError(null);

		const res = await _endpoint.fetch.self(i);

		if (res.ok) {
			setForm(res.data);
		} else {
			setError(res.error);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		setForm({});

		if (id !== null) {
			doFetch(id);
		}
	}, [id]);

	return (
		<Box className={styles["wizard-container"]} style={{ background: "inherit", backgroundColor: "inherit" }}>
			{isLoading && (
				<div className={styles["wizard-container-loader"]}>
					<CircularProgress  style={{ color: COLORS.accent }} size={48} thickness={2} />
				</div>
			)}
			{!isLoading && error !== null && <Typography variant='error' className={styles["wizard-container-loader"]}>{error}</Typography>}
			{!isLoading && error === null && (
				<>
					<_shards.form
						onSave={finish}
						onCancel={onBack}
						values={form}
						onValueChange={setFormValue}
						className={styles["wizard-form"]}
					/>
					<_shards.preview values={form} className={styles["wizard-preview"]} />
				</>
			)}
		</Box>
	);
};

export default Shard;
