import React from "react";
import GridLayout, { WidthProvider } from "react-grid-layout";
import type { Layout } from "react-grid-layout";

import type { FC } from "react";

import { $features } from "@features";
import type { Features } from "@features";

const Grid = WidthProvider(GridLayout);

interface Props {
	layout: Layout[];
	widgets: Array<Features["open"]["widget"]["default"]["i"]>;
}

const WidgetPanel: FC<Props> = ({ layout, widgets }) => {
	return (
		<Grid
			cols={4}
			rowHeight={192}
			layout={layout}
			margin={[12, 12]}
			isBounded
			isDraggable={false}
			style={{ position: "relative" }}
		>
			{widgets.map((id) => (
				<$features.open.widget.view key={id} id={id} />
			))}
		</Grid>
	);
};

export default WidgetPanel;

/* INFO
WidgetPanel Sink handles rendering and logic forwarding to react-grid-layout
There is no state and no handlers, however in terms of "logic flow" it's not a dead-end, hence it is a Sink
*/
