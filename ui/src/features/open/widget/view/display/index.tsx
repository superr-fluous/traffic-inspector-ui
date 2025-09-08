import React, { memo, useState, useRef } from "react";
import equal from "fast-deep-equal";
import type { ComponentProps, FC } from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { $helpers, $hooks, $ui } from "@shared";

import _helpers from "../../utilities/mappers";
import _endpoint from "../../endpoint";

import type { GenericWidgetPreviewProps, GenericWidgetViewProps, Model } from "../../model";

import styles from "./styles.module.css";

type Props = ComponentProps<"div"> & {
	id: Model["i"];
};


/* IMPROVE(?): unified dashboar endpoint for fetching widget data

  * client sends "fetch me data for widget with the ID={id}"
  * + no need to fetch widget here
  * + only id and name are needed for Dashboard page (basically Dashboard page only communicates with Dashboard model)
  * - added complexity for the endpoint
*/

const View: FC<Props> = ({ id, className, ...props }) => {
	const [widget, setWidget] = useState<Model | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const view = useRef<ReturnType<typeof _helpers.widgetVisual> | null>(null);

	const onConfigReceive = (profile: typeof widget) => {
		const visual = _helpers.widgetVisual(profile?.dataInfo, profile?.dataVisual);

		if (visual === null || visual === undefined) {
			view.current = null;
		} else {
			view.current = memo(visual, (prev, current) => equal((prev as GenericWidgetViewProps).i, (current as GenericWidgetViewProps).i));
		}

		setWidget(profile);
	};

	const doFetch = async () => {
    setIsLoading(true)
    const res = await _endpoint.fetch.self(id)

    if (res.ok) {
      onConfigReceive(res.data)
    } else {
      setWidget(null)
      setError(res.error)
    }

    setIsLoading(false)
	};

	$hooks.useOnce(doFetch);

	return (
		<div {...props} id={id} className={$helpers.clsx(className, styles["widget-container"])}>
			{isLoading && <$ui.loader loading error={error} />}

			{!isLoading && widget === null && <Typography variant='error'>Unknown error</Typography>}
			{!isLoading && widget !== null && (
				<>
					<div
						style={{
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "space-between",
							paddingInline: "1rem",
						}}
					>
						<Typography variant='tableHeader'>{widget.name}</Typography>
					</div>
					<Divider />
					{view.current && <view.current i={widget.i} />}
				</>
			)}
		</div>
	);
};

export default View;