import React, { useState } from "react";
import type { FC } from "react";

import type { WidgetConfig, WidgetModel } from "../../model";

import Components from "./components";
import { getDataVisualOptions } from "../../helpers";

interface Props {
	widget: WidgetModel;
	onConfirmConfiguration: (config: WidgetConfig) => void;
}

// TODO: 1x1 widget currently can't fit the wizard
const WidgetWizard: FC<Props> = ({ widget, onConfirmConfiguration }) => {
	const [activeStep, setActiveStep] = useState(1);
	const [dataSource, setDataSource] = useState<WidgetConfig["dataSource"]>(widget.config.dataSource ?? "flows");
	const [dataInfo, setDataInfo] = useState<WidgetConfig["dataInfo"]>(widget.config.dataInfo ?? "TOTAL");
	const [dataVisual, setDataVisual] = useState<WidgetConfig["dataVisual"] | undefined>(
		widget.config.dataVisual ?? "line"
	);

	const selectVisual = (value: typeof dataVisual) => {
		setDataVisual(value);
	};

	const finish = () => {
		onConfirmConfiguration({ dataInfo, dataSource, dataVisual } as WidgetConfig);
	};

	const selectInfo = (value: typeof dataInfo) => {
		setDataInfo(value);

		const visualOptions = getDataVisualOptions(value);

		if (!visualOptions.includes(dataVisual!)) {
			setDataVisual(visualOptions[0]);
		}
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
				background: "inherit",
				backgroundColor: "inherit",
			}}
		>
			<Components.Form style={{ background: "inherit", backgroundColor: "inherit" }}>
				{activeStep === 1 && (
					<>
						<Components.SourceSelect value={dataSource} onChange={setDataSource} />
						<Components.InfoSelect value={dataInfo} dataSource={dataSource} onChange={selectInfo} />
					</>
				)}
				{activeStep === 2 && <Components.VisualSelect dataInfo={dataInfo} value={dataVisual} onChange={selectVisual} />}
			</Components.Form>
			<Components.Stepper
				step={activeStep}
				total={2}
				onBack={() => setActiveStep((current) => current - 1)}
				onFinish={finish}
				onForward={() => setActiveStep((current) => current + 1)}
			/>
		</div>
	);
};

export default WidgetWizard;
