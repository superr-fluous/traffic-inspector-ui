import React from "react";
import type { FC } from "react";

import { $ui } from "@shared";

import { ResponsiveLineCanvas } from "@nivo/line";

const Line: FC = () => {
  // fetch
  const mock = [
    {
      id: "Packets",
      data: [
        { x: "10:00", y: 120 },
        { x: "10:05", y: 200 },
        { x: "10:10", y: 150 },
        { x: "10:15", y: 180 },
        { x: "10:20", y: 220 },
      ],
    },
  ];

  return (
    <$ui.widget header="Flows Over Time" size={{ w: "100%" }}>
      <ResponsiveLineCanvas
        data={mock}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        axisBottom={{ legend: "Time", legendOffset: 36 }}
        axisLeft={{ legend: "Flows", legendOffset: -40 }}
      />
    </$ui.widget>
  );
};

export default Line;
