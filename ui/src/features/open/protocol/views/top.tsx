import React from "react";
import type { FC } from "react";

import { ResponsivePieCanvas } from "@nivo/pie";

import { $ui } from "@shared";

const Pie: FC = ({}) => {
  // fetch;
  const mock = [
    { id: "TCP", label: "TCP", value: 40 },
    { id: "UDP", label: "UDP", value: 30 },
    { id: "ICMP", label: "ICMP", value: 15 },
    { id: "Other", label: "Other", value: 15 },
  ];

  return (
    <$ui.widget header="Top Protocols" size={{ w: "100%" }}>
      <ResponsivePieCanvas
        data={mock}
        margin={{ top: 20, bottom: 40, left: 40, right: 40 }}
      />
    </$ui.widget>
  );
};

export default Pie;
