import React from "react";
import type { FC } from "react";

import { ResponsivePieCanvas } from "@nivo/pie";

import { $ui } from "@shared";

const Pie: FC = ({}) => {
  // fetch;
  const mock = [
    { id: "Web", label: "Web", value: 45 },
    { id: "Streaming", label: "Streaming", value: 25 },
    { id: "Gaming", label: "Gaming", value: 15 },
    { id: "Other", label: "Other", value: 15 },
  ];

  return (
    <$ui.widget header="Top Categories" size={{ w: "100%" }}>
      <ResponsivePieCanvas
        data={mock}
        margin={{ top: 20, bottom: 40, left: 40, right: 40 }}
      />
    </$ui.widget>
  );
};

export default Pie;
