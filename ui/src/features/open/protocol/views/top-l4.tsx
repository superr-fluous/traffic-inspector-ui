import React from "react";
import type { FC } from "react";

import { ResponsivePieCanvas } from "@nivo/pie";

import { $ui } from "@shared";

const Pie: FC = () => {
  const mock = [
    { id: "TCP", label: "TCP", value: 60 },
    { id: "UDP", label: "UDP", value: 35 },
    { id: "SCTP", label: "SCTP", value: 5 },
  ];

  return (
    <$ui.widget header="Top L4 Protocols" size={{ w: "100%" }}>
      <ResponsivePieCanvas
        data={mock}
        margin={{ top: 20, bottom: 40, left: 40, right: 40 }}
      />
    </$ui.widget>
  );
};

export default Pie;
