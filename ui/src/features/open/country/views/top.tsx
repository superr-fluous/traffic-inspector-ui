import React from "react";
import type { FC } from "react";

import { ResponsivePieCanvas } from "@nivo/pie";

import { $ui } from "@shared";

const Pie: FC = () => {
  // fetch;
  const mock = [
    { id: "US", label: "US", value: 500 },
    { id: "DE", label: "DE", value: 300 },
    { id: "FR", label: "FR", value: 200 },
    { id: "CN", label: "CN", value: 150 },
    { id: "IN", label: "IN", value: 100 },
  ];

  return (
    <$ui.widget header="Top Countries" size={{ w: "100%" }}>
      <ResponsivePieCanvas
        data={mock}
        margin={{ top: 20, bottom: 40, left: 40, right: 40 }}
      />
    </$ui.widget>
  );
};

export default Pie;
