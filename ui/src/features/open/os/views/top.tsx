import React from "react";
import type { FC } from "react";

import { ResponsivePieCanvas } from "@nivo/pie";

import { $ui } from "@shared";

const Pie: FC = ({}) => {
  // fetch;
  const mock = [
    { id: "Windows", label: "Windows", value: 50 },
    { id: "Linux", label: "Linux", value: 30 },
    { id: "macOS", label: "macOS", value: 20 },
  ];

  return (
    <$ui.widget header="Top OS" size={{ w: "100%" }}>
      <ResponsivePieCanvas
        data={mock}
        margin={{ top: 20, bottom: 40, left: 40, right: 40 }}
      />
    </$ui.widget>
  );
};

export default Pie;
