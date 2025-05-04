import React from "react";
import type { FC } from "react";

import { ResponsivePieCanvas } from "@nivo/pie";

import { $ui } from "@shared";

const Pie: FC = () => {
  // fetch
  const mock = [
    { id: "AS15169", value: 400 },
    { id: "AS13335", value: 350 },
    { id: "AS16509", value: 300 },
  ];

  return (
    <$ui.widget header="Top ASN" size={{ w: "100%" }}>
      <ResponsivePieCanvas
        data={mock}
        margin={{ top: 20, bottom: 40, left: 40, right: 40 }}
      />
    </$ui.widget>
  );
};

export default Pie;
