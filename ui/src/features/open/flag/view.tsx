import React from "react";
import type { FC } from "react";

import type { CountryCode } from "./model";

interface Props {
	code: CountryCode;
}

// TODO: добавить ассеты флагов
export const Inline: FC<Props> = ({ code }) => {
	if (code === "local") return <span title={code}>{"🌐"}</span>;

	if (code === "unknown") {
		return <span title={code}>{"❓"}</span>;
	}

	return <span title={code}>{"🌐"}</span>;
};
