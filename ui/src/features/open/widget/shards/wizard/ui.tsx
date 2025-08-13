import React from "react";
import type { ComponentProps, FC } from "react";

import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import LinearProgress from "@mui/material/LinearProgress";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import SensorsIcon from "@mui/icons-material/Sensors";
import BarChartTwoToneIcon from "@mui/icons-material/BarChartTwoTone";
import PieChartTwoToneIcon from "@mui/icons-material/PieChartTwoTone";
import AreaChartTwoToneIcon from "@mui/icons-material/AreaChartTwoTone";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";

import { $helpers, $ui } from "@shared";

import type { Config } from "../../model";

import styles from "./styles.module.css";
import { getDataInfoOptions, getDataVisualOptions } from "../../utilities/mappers";

interface VisualSelectProps {
	value: Config["visual"];
	info: Config["info"];
	onChange: (value: Config["visual"]) => void;
}

const VisualSelect: FC<VisualSelectProps> = ({ info, value, onChange }) => {
	const visualOptions = getDataVisualOptions(info);

	return (
		<>
			<$ui.ribbonLabel label='Visual' placement='bottom-right' className={styles["visual-select-grid"]}>
				{visualOptions.map((opt, index) => {
					return (
						<div
							className={$helpers.clsx(
								styles["visual-select-option"],
								value === opt && styles.selected,
								index === 2 && styles.extended
							)}
							onClick={() => onChange(opt)}
						>
							<div style={{ flex: "1 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
								{opt === "sensor" && <SensorsIcon fontSize='large' color={value === opt ? "inherit" : "primary"} />}
								{opt === "bar" && (
									<BarChartTwoToneIcon fontSize='large' color={value === opt ? "inherit" : "primary"} />
								)}
								{opt === "pie" && (
									<PieChartTwoToneIcon fontSize='large' color={value === opt ? "inherit" : "primary"} />
								)}
								{opt === "line" && (
									<AreaChartTwoToneIcon fontSize='large' color={value === opt ? "inherit" : "primary"} />
								)}
							</div>
							<Typography style={{ flex: "0 0 auto" }} variant='baseXl'>
								{opt.toUpperCase()}
							</Typography>
						</div>
					);
				})}
			</$ui.ribbonLabel>
		</>
	);
};

interface InfoSelectProps {
	value: Config["info"];
	source: Config["source"];
	onChange: (value: Config["info"]) => void;
}

const InfoSelect: FC<InfoSelectProps> = ({ source, value, onChange }) => {
	const infoOptions = getDataInfoOptions(source);

	return (
		<>
			<$ui.ribbonLabel label='Data info' placement='bottom-right' className={styles["wizard-ribbon"]}>
				<Select value={value} onChange={(e) => onChange(e.target.value as typeof value)} size='small' fullWidth>
					{infoOptions.map((o) => (
						<MenuItem value={o}>{o}</MenuItem>
					))}
				</Select>
			</$ui.ribbonLabel>
		</>
	);
};

interface SourceSelectProps {
	value: Config["source"];
	onChange: (value: Config["source"]) => void;
}

const SourceSelect: FC<SourceSelectProps> = ({ value, onChange }) => {
	return (
		<>
			<$ui.ribbonLabel label='Data source' placement='bottom-right' className={styles["wizard-ribbon"]}>
				<ToggleButtonGroup
					onChange={(_, val: Config["source"]) => onChange(val)}
					defaultValue='flows'
					value={value}
					size='small'
					fullWidth
				>
					<ToggleButton color='primary' value='flows' defaultChecked>
						Flows
					</ToggleButton>
					<ToggleButton color='primary' value='system' disabled>
						System
					</ToggleButton>
				</ToggleButtonGroup>
			</$ui.ribbonLabel>
		</>
	);
};

interface StepperProps {
	/**
	 * avoid zero
	 */
	step: number;
	total: number;
	onBack: VoidFunction;
	onFinish: VoidFunction;
	onForward: VoidFunction;
}

const Stepper: FC<StepperProps> = ({ step, total, onBack, onFinish, onForward }) => {
	return (
		<div style={{ width: "75%", flex: "0 0 auto", display: "flex", gap: "1rem", alignItems: "center" }}>
			<Button
				sx={{ flex: "0 0 auto" }}
				startIcon={<KeyboardDoubleArrowLeft />}
				size='small'
				onClick={onBack}
				disabled={step === 1}
				style={{ visibility: step === 1 ? "hidden" : undefined }}
			>
				Back
			</Button>

			<LinearProgress sx={{ flex: "75%" }} variant='determinate' value={(100 / total) * (step - 1)} />

			<Button
				sx={{ flex: "0 0 auto" }}
				startIcon={step === total ? <CheckCircleOutlineIcon /> : <KeyboardDoubleArrowRight />}
				size='small'
				onClick={step === total ? onFinish : onForward}
			>
				{step === total ? "Finish" : "Next"}
			</Button>
		</div>
	);
};

const Form: FC<ComponentProps<"div">> = (props) => <div {...props} className={styles["wizard-form"]} />;

interface SummaryProps {
	values: {
		source: Config["source"];
		info: Config["info"];
		visual: Config["visual"];
	};
	onConfirm: VoidFunction;
	onReset: VoidFunction;
}

const Summary: FC<SummaryProps> = ({ values, onConfirm, onReset }) => {
	return (
		<>
			<div
				style={{
					borderRadius: "8px",
					border: "1px solid var(--disabled)",
					marginTop: "2rem",
					paddingBlock: "1rem",
					paddingInline: "4rem",
					flex: "1 1 auto",
					display: "flex",
					gap: "4rem",
					alignItems: "flex-start",
					justifyContent: "space-between",
				}}
			>
				<div>
					<Typography variant='body1' color='textPrimary'>
						Data source:
					</Typography>
					<Typography variant='body1' color='textPrimary'>
						Data info:
					</Typography>
					<Typography variant='body1' color='textPrimary'>
						Visual:
					</Typography>
				</div>
				<div>
					<Typography variant='body1' color='textPrimary'>
						{values.source}
					</Typography>
					<Typography variant='body1' color='textPrimary'>
						{values.info}
					</Typography>
					<Typography variant='body1' color='textPrimary'>
						{values.visual}
					</Typography>
				</div>
			</div>
			<div>
				<Button onClick={onConfirm}>Confirm</Button>
				<Button onClick={onReset}>Reset</Button>
			</div>
		</>
	);
};

export default { VisualSelect, InfoSelect, SourceSelect, Stepper, Form, Summary };
