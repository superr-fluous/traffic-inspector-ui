import React, { useState, useEffect } from "react";
import type { ComponentProps } from "react";

import Typography from "@mui/material/Typography";

import { $ui } from "@shared";

import AnimatedNumber from "./components";

const Total: ComponentProps<"div"> = (props) => {
  // fetch
  const [total, setTotal] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setIsLoading(false);
      setTotal(Math.floor(Math.random() * 100000));
    }, 10000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div
      {...props}
      style={{
        ...props.style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="blockHeader"
        style={{ fontSize: "2rem", color: "var(--accent)", lineHeight: 1 }}
      >
        {isLoading && <$ui.loader size={24} thickness={4} />}
        {!isLoading && total === null && "Unknown"}
        {!isLoading && total !== null && <AnimatedNumber number={total} />}
      </Typography>
      <Typography
        variant="tableCell"
        style={{ fontSize: "0.75rem", letterSpacing: 1.66 }}
      >
        Total flows
      </Typography>
    </div>
  );
};

export default Total;
