import React, { useState } from "react";
import type { FC } from "react";

import type { Config, Model } from "../../model";

import _ui from "./ui";

import styles from "./styles.module.css";
import { getDataVisualOptions } from "../../utilities/mappers";

interface Props {
	config: Config;
	onConfirmConfiguration: (config: Config) => void;
}

const Wizard: FC<Props> = ({ config, onConfirmConfiguration }) => {
	const [activeStep, setActiveStep] = useState(1);
	const [source, setDataSource] = useState<Config["source"]>(config.source ?? "flows");
	const [info, setDataInfo] = useState<Config["info"]>(config.info ?? "TOTAL");
	const [visual, setDataVisual] = useState<Config["visual"] | undefined>(config.visual ?? "line");

	const selectVisual = (value: typeof visual) => {
		setDataVisual(value);
	};

	const finish = () => {
		onConfirmConfiguration({ info, source, visual } as Config);
	};

	const selectInfo = (value: typeof info) => {
		setDataInfo(value);

		const visualOptions = getDataVisualOptions(value);

		if (!visualOptions.includes(visual!)) {
			setDataVisual(visualOptions[0]);
		}
	};

	return (
		<div className={styles["wizard-container"]} style={{ background: "inherit", backgroundColor: "inherit" }}>
			<_ui.Form style={{ background: "inherit", backgroundColor: "inherit" }}>
				{activeStep === 1 && (
					<>
						<_ui.SourceSelect value={source} onChange={setDataSource} />
						<_ui.InfoSelect value={info} source={source} onChange={selectInfo} />
					</>
				)}
				{activeStep === 2 && <_ui.VisualSelect info={info} value={visual} onChange={selectVisual} />}
			</_ui.Form>
			<_ui.Stepper
				step={activeStep}
				total={2}
				onBack={() => setActiveStep((current) => current - 1)}
				onFinish={finish}
				onForward={() => setActiveStep((current) => current + 1)}
			/>
		</div>
	);
};

export default Wizard;
