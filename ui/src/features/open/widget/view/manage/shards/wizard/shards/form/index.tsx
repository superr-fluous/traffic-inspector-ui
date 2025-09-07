import React from "react";
import type { FC } from "react";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { $helpers } from "@shared";

import _helpers from "../../../../../../utilities";
import type {  Model } from "../../../../../../model";

import styles from "./styles.module.css";

export type Form = Omit<Model, "i" | "bookmarked">;

interface Props {
	values: Partial<Form>;
	className?: string;
	onValueChange: <T extends keyof Form>(field: T, value: Form[T]) => void;
	onSave: VoidFunction;
	onCancel: VoidFunction;
}

const dataSourceOptions = _helpers.lists.dataSourceOptions();

const Shard: FC<Props> = ({ className, values, onValueChange, onSave, onCancel }) => {
	const dataInfoOptions = _helpers.lists.dataInfoOptions(values.dataSource);
	const dataVisualOptions = _helpers.lists.dataVisualOptions(values.dataInfo);

	const actionSave = () => {
		onSave();
	};

	const actionCancel = () => {
		onCancel();
	};

	return (
		<Box className={$helpers.clsx(styles["form-container"], className)}>
			<Box className={styles["form-item"]}>
				<Typography variant='baseXl' className={styles["label"]}>
					Name
				</Typography>
				<Input
					value={values.name}
					defaultValue='New widget'
					onChange={(e) => onValueChange("name", e.target.value)}
					className={styles["control"]}
				/>
			</Box>

			<Box
				sx={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr", gap: "1rem" }}
			>
				<Box className={styles["form-item"]} sx={{ flex: "0 0 50%" }}>
					<Typography variant='baseXl' className={styles["label"]}>
						Data source
					</Typography>
					<Select
						value={values.dataSource ?? "flow"}
						onChange={(e) => onValueChange("dataSource", e.target.value as Form["dataSource"])}
						className={styles["control"]}
					>
						{dataSourceOptions.map((opt) => (
							<MenuItem value={opt.value}>{opt.label}</MenuItem>
						))}
					</Select>
				</Box>

				<Box className={styles["form-item"]} sx={{ flex: "0 0 50%" }}>
					<Typography variant='baseXl' className={styles["label"]}>
						Data info
					</Typography>
					<Select
						value={values.dataInfo}
						onChange={(e) => onValueChange("dataInfo", e.target.value as Form["dataInfo"])}
						className={styles["control"]}
						disabled={values.dataSource === undefined}
					>
						{dataInfoOptions.map((opt) => (
							<MenuItem value={opt.value}>{opt.label}</MenuItem>
						))}
					</Select>
				</Box>
			</Box>

			<Box className={styles["form-item"]}>
				<Box sx={{ height: "8rem" }}>
					<Box className={styles["form-item"]}>
						<Typography variant='baseXl' className={styles["label"]}>
							Data visual
						</Typography>
						<Select
							onChange={(e) => onValueChange("dataVisual", e.target.value as Form["dataVisual"])}
							className={styles["control"]}
							disabled={values.dataInfo === undefined}
						>
							{dataVisualOptions.map((opt) => (
								<MenuItem value={opt.value}>{opt.label}</MenuItem>
							))}
						</Select>
					</Box>

					<Box className={styles["form-item"]} style={{ marginBlockStart: "1rem" }} sx={{ height: "8rem" }}>
						<Typography variant='baseXl' className={styles["label"]}>
							Widget type specific configuration
						</Typography>
					</Box>
				</Box>
			</Box>

			<Box className={styles["form-item"]} sx={{ height: "8rem" }} style={{ marginBlockStart: "1rem" }}>
				<Typography variant='baseXl' className={styles["label"]}>
					Filters
				</Typography>
			</Box>

			<Box className={$helpers.clsx(styles["form-item"], styles["inline"])} style={{ marginBlockStart: "auto" }}>
				<Button variant='contained' onClick={actionSave}>
					Save
				</Button>
				<Button variant='outlined' onClick={actionCancel}>
					Cancel
				</Button>
			</Box>
		</Box>
	);
};

export default Shard;
