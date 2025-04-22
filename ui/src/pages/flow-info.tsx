import React from "react";
import type { FC } from "react";

import { PageHeader } from "@shared/ui/page-header";

import { FEATURE_FLOW } from "@features/closed/flow";
import type { FEATURE_FLOW_MODEL } from "@features/closed/flow";

interface Props {
  flow_id: FEATURE_FLOW_MODEL["default"]["id"];
}

const Page: FC<Props> = ({ flow_id }) => (
  <>
    <PageHeader>Network Flow Info</PageHeader>
    {flow_id !== undefined && <FEATURE_FLOW.view.info flow_id={flow_id} />}
  </>
);

export default Page;
