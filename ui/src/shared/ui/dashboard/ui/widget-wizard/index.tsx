import React, { useState } from "react";
import type { FC } from "react";

import type { WidgetConfig, WidgetModel } from "../../model";

import Components from "./components";

interface Props {
	widget: WidgetModel;
	onConfirmConfiguration: (config: WidgetConfig) => void;
}

const WidgetWizard: FC<Props> = ({ widget, onConfirmConfiguration }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [dataSource, setDataSource] = useState<WidgetConfig["dataSource"]>(widget.config.dataSource ?? "flows");
	const [dataInfo, setDataInfo] = useState<WidgetConfig["dataInfo"]>(widget.config.dataInfo ?? "TOTAL");
	const [dataVisual, setDataVisual] = useState<WidgetConfig["dataVisual"] | undefined>(widget.config.dataVisual);
	const [showSummary, setShowSummary] = useState(false);

	const selectVisual = (value: typeof dataVisual) => {
		setDataVisual(value);
		setShowSummary(true);
	};

	const confirm = () => {
		onConfirmConfiguration({ dataInfo, dataSource, dataVisual } as WidgetConfig);
	};

	const reset = () => {
		setActiveStep(0);
		setDataSource("flows");
		setDataInfo("TOTAL");
		setDataVisual(undefined);
		setShowSummary(false);
	};

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "1rem",
			}}
		>
			{showSummary && (
				<Components.Summary values={{ dataSource, dataInfo, dataVisual }} onConfirm={confirm} onReset={reset} />
			)}

			{!showSummary && (
				<>
					<Components.Form>
						{activeStep === 0 && <Components.SourceSelect value={dataSource} onChange={setDataSource} />}
						{activeStep === 1 && (
							<Components.InfoSelect value={dataInfo} dataSource={dataSource} onChange={setDataInfo} />
						)}
						{activeStep === 2 && (
							<Components.VisualSelect dataInfo={dataInfo} value={dataVisual} onChange={selectVisual} />
						)}
					</Components.Form>
					<Components.Stepper
						step={activeStep}
						onBack={() => setActiveStep((current) => current - 1)}
						onForward={() => setActiveStep((current) => current + 1)}
					/>
				</>
			)}
		</div>
	);
};

export default WidgetWizard;
