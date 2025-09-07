import React, { useMemo, useRef, useState } from "react";

import Box from "@mui/material/Box";

import { $ui } from "@shared";
import PageWrapper from "@layout/page";

import _shards from "./shards";
import _endpoint from "../../endpoint";
import type { Props as ShardsProps } from "./shards";

import { Model } from "../../model";

interface PromiseHandlers {
	resolve: (value: boolean) => void;
	reject: (reason?: unknown) => void;
}

const View = () => {
	const [editID, setEditID] = useState<Model["i"] | null>("1");
	const editPromise = useRef<PromiseHandlers>(null);

	const doDelete = async (i: Model["i"]) => {
		const res = await _endpoint.delete.self(i);
		return res.ok;
	};

	const onEdit: ShardsProps["list"]["actionHandlers"]["edit"] = (id) => {
		setEditID(id);
		const promise = new Promise<boolean>((resolve, reject) => {
			editPromise.current = { resolve, reject };
		});

		return promise;
	};

	const onEditFinish = (revalidate: boolean) => {
		editPromise.current!.resolve(revalidate);
		setEditID(null);
	};

	const onDelete: ShardsProps["list"]["actionHandlers"]["delete"] = (id) => {
		return doDelete(id);
	};

	const onAdd: ShardsProps["list"]["actionHandlers"]["add"] = async () => {
		const res = await _endpoint.create.self();

		if (!res.ok) {
			return new Promise<boolean>((resolve) => {
				resolve(false);
			});
		}

		return onEdit(res.data);
	};

	const listHandlers: ShardsProps["list"]["actionHandlers"] = useMemo(
		() => ({
			edit: onEdit,
			delete: onDelete,
			add: onAdd,
		}),
		[]
	);

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "100%",
				height: "100%",
				maxHeight: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				justifyContent: "flex-start",
				paddingTop: "1rem",
			}}
		>
			<_shards.list actionHandlers={listHandlers} />

			<$ui.overlay show={editID !== null} onBack={() => setEditID(null)}>
				<PageWrapper paddingBlock='sm'>
					<$ui.pageHeader style={{ marginBlockEnd: "1rem" }}>Widget wizard</$ui.pageHeader>
					<_shards.wizard
						id={editID}
						onBack={() => {
							onEditFinish(false);
						}}
						onConfirmConfiguration={() => {
							onEditFinish(true);
						}}
					/>
				</PageWrapper>
			</$ui.overlay>
		</Box>
	);
};

export default View;
