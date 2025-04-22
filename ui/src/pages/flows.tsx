import React from "react";

import { FEATURE_FLOW } from "@features/closed/flow";
import { PageHeader } from "@shared/ui/page-header";

const Page = () => (
  <>
    <PageHeader>Network Flows</PageHeader>
    <FEATURE_FLOW.view.table />
  </>
);

export default Page;
