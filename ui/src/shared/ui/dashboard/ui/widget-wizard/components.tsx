import React from "react";
import type { ComponentProps, FC } from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import SensorsIcon from "@mui/icons-material/Sensors";
import BarChartTwoToneIcon from "@mui/icons-material/BarChartTwoTone";
import PieChartTwoToneIcon from "@mui/icons-material/PieChartTwoTone";
import AreaChartTwoToneIcon from "@mui/icons-material/AreaChartTwoTone";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";

import { $helpers } from "@shared";

import { getDataInfoOptions, getDataVisualOptions } from "../../helpers";
import type { WidgetConfig, WidgetModel } from "../../model";

import styles from "./styles.module.css";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

interface VisualSelectProps {
	value: WidgetConfig["dataVisual"];
	dataInfo: WidgetConfig["dataInfo"];
	onChange: (value: WidgetConfig["dataVisual"]) => void;
}

const VisualSelect: FC<VisualSelectProps> = ({ dataInfo, value, onChange }) => {
	const dataVisualOptions = getDataVisualOptions(dataInfo);

	return (
		<>
			<FormLabel>
				<Typography fontSize='1.25rem'>Data visual</Typography>
			</FormLabel>

			<div className={styles["visual-select-grid"]}>
				{dataVisualOptions.map((opt, index) => {
					return (
						<div
							className={$helpers.clsx(
								styles["visual-select-option"],
								value === opt && styles.selected,
								index === 2 && styles.extended
							)}
							onClick={() => onChange(opt)}
						>
							<div>
								{opt === "sensor" && <SensorsIcon fontSize='large' color='primary' />}
								{opt === "bar" && <BarChartTwoToneIcon fontSize='large' color='primary' />}
								{opt === "pie" && <PieChartTwoToneIcon fontSize='large' color='primary' />}
								{opt === "line" && <AreaChartTwoToneIcon fontSize='large' color='primary' />}
							</div>
							<Typography variant='baseXl'>{opt.toUpperCase()}</Typography>
						</div>
					);
				})}
			</div>
		</>
	);
};

interface InfoSelectProps {
	value: WidgetConfig["dataInfo"];
	dataSource: WidgetConfig["dataSource"];
	onChange: (value: WidgetConfig["dataInfo"]) => void;
}

const InfoSelect: FC<InfoSelectProps> = ({ dataSource, value, onChange }) => {
	const dataInfoOptions = getDataInfoOptions(dataSource);

	return (
		<>
			<div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
				<FormLabel>
					<Typography fontSize='1.25rem'>Data info:</Typography>
				</FormLabel>
				<Select value={value} onChange={(e) => onChange(e.target.value as typeof value)}>
					{dataInfoOptions.map((o) => (
						<MenuItem value={o}>{o}</MenuItem>
					))}
				</Select>
			</div>
			<Typography variant='subtitle1'>
				{value === "ASN" && <>ASN</>}
				{value === "CATEGORY" && <>CATEGORY</>}
				{value === "COUNTRY" && <>COUNTRY</>}
				{value === "IP" && <>IP</>}
				{value === "OS" && <>OS</>}
				{value === "PROTOCOL" && <>PROTOCOL</>}
				{value === "TOTAL" && <>TOTAL</>}
			</Typography>
		</>
	);
};

interface SourceSelectProps {
	value: WidgetConfig["dataSource"];
	onChange: (value: WidgetConfig["dataSource"]) => void;
}

const SourceSelect: FC<SourceSelectProps> = ({ value, onChange }) => {
	return (
		<>
			<div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
				<FormLabel>
					<Typography fontSize='1.25rem'>Data source:</Typography>
				</FormLabel>
				<ToggleButtonGroup
					onChange={(_, val: WidgetConfig["dataSource"]) => onChange(val)}
					defaultValue='flows'
					value={value}
				>
					<ToggleButton color='primary' value='flows' defaultChecked>
						Flows
					</ToggleButton>
					<ToggleButton color='primary' value='system'>
						System
					</ToggleButton>
				</ToggleButtonGroup>
			</div>
			<Typography variant='subtitle1'>
				{value === "flows" && <>Use flow data to power your charts</>}
				{value === "system" && <>Use system info to power your charts</>}
			</Typography>
		</>
	);
};

interface StepperProps {
	step: number;
	onBack: VoidFunction;
	onForward: VoidFunction;
}

const Stepper: FC<StepperProps> = ({ step, onBack, onForward }) => {
	return (
		<div style={{ width: "75%", flex: "0 0 auto", display: "flex", gap: "1rem", alignItems: "center" }}>
			<Button
				sx={{ flex: "0 0 auto" }}
				startIcon={<KeyboardDoubleArrowLeft />}
				size='small'
				onClick={onBack}
				disabled={step === 0}
			>
				Back
			</Button>
			<LinearProgress sx={{ flex: "1 0 auto" }} variant='determinate' value={step === 0 ? 0 : (100 / 3) * step} />

			{step !== 2 && (
				<Button sx={{ flex: "0 0 auto" }} startIcon={<KeyboardDoubleArrowRight />} size='small' onClick={onForward}>
					Next
				</Button>
			)}
		</div>
	);
};

const Form: FC<ComponentProps<"div">> = (props) => (
	<div
		{...props}
		style={{
			...props.style,
			flex: "1 1 auto",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			gap: "1.5rem",
		}}
	/>
);

interface SummaryProps {
	values: {
		dataSource: WidgetConfig["dataSource"];
		dataInfo: WidgetConfig["dataInfo"];
		dataVisual: WidgetConfig["dataVisual"];
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
						{values.dataSource}
					</Typography>
					<Typography variant='body1' color='textPrimary'>
						{values.dataInfo}
					</Typography>
					<Typography variant='body1' color='textPrimary'>
						{values.dataVisual}
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
