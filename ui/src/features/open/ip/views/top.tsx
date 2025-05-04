import React from "react";
import type { FC } from "react";

import { ResponsiveBarCanvas } from "@nivo/bar";

import { $ui } from "@shared";

const Bar: FC = () => {
  // fetch
  const mock = [
    { id: "192.168.1.1", value: 400 },
    { id: "192.168.1.10", value: 350 },
    { id: "192.168.1.12", value: 300 },
    { id: "10.0.0.2", value: 280 },
    { id: "172.16.0.5", value: 260 },
  ];

  return (
    <$ui.widget header="Top IP Addresses" size={{ w: "100%" }}>
      <ResponsiveBarCanvas
        data={mock}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        layout="vertical"
        axisBottom={{ legend: "IP Address", legendOffset: 36 }}
        axisLeft={{ legend: "Flows", legendOffset: -40 }}
      />
    </$ui.widget>
  );
};

export default Bar;
