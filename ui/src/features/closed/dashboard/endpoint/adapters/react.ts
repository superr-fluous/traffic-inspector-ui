import { useCallback, useRef, useState } from "react";

import { $hooks } from "@shared";
import { $features, Features } from "@features";

import _query from "../query";
import { Layout, Model, ViewList } from "../../model";
import { makeLayout } from "../../helpers";

interface UseLayoutMeta {
	isLoading: boolean;
	error: string | null;
	lastAdded: Layout["i"] | null;
}

interface UseLayoutAPI {
	fetch: VoidFunction;
	save: (l: Model) => void;
	reset: VoidFunction;
	deleteItem: (i: Layout["i"]) => void;
	toggleItem: (i: Layout["i"], active: Layout["active"]) => void;
	renameItem: (id: Layout["i"], name: Layout["meta"]["name"]) => void;
	bookmarkItem: (id: Layout["i"], bookmarked: Layout["meta"]["bookmarked"]) => void;
	addItem: (size: { w: number; h: number }) => void;
}

const useLayout = (view: ViewList): [Model, UseLayoutMeta, UseLayoutAPI] => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [layout, setLayout] = useState<Model>([]);

	const layoutStash = useRef<Model>([]);
	const lastAdded = useRef<Features["open"]["widget"]["default"]["i"]>(null);

	const fetch = useCallback(() => {
		_query.fetch
			.layout(view)
			.then((res) => {
				if (res.ok) {
					setLayout(res.data);
					setError(null);
					layoutStash.current = res.data;
				} else {
					setLayout([]);
					setError(res.error);
					layoutStash.current = [];
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [view]);

	const save = useCallback(
		(layout: Model) => {
			_query.save.layout(view, layout).then((res) => {
				if (!res.ok) {
					// TODO: toast
					console.warn("Failed to save dashboard layout:", res.code, res.error);
				}
			});
		},
		[view]
	);

	const reset = () =>
		useCallback(() => {
			setLayout(layoutStash.current);
			save(layoutStash.current);
		}, [setLayout]);

	const deleteItem = useCallback(
		(id: Layout["i"]) => {
			setLayout((current) => current.filter((item) => item.i !== id));
		},
		[setLayout]
	);

	const toggleItem = useCallback(
		(id: Layout["i"], active: Layout["active"]) => {
			setLayout((current) => current.map((item) => (item.i === id ? { ...item, active } : item)));
		},
		[setLayout]
	);

	const renameItem = useCallback(
		(id: Layout["i"], name: Layout["meta"]["name"]) => {
			// how the fuck do i use widget API from here - it breaks the architecture rules.......
			// i mean a knew that it was possible that a feature would expose an endpoint, but it's shady...
			setLayout((current) =>
				current.map((item) => (item.i === id ? { ...item, meta: { bookmarked: item.meta.bookmarked, name } } : item))
			);

			$features.open.widget.endpoint.save.name(id, name).then((res) => {
				if (!res.ok) {
					// TODO: toast
					console.warn("Failed to update widget name", res.code, res.error);
				}
			});
		},
		[setLayout]
	);

	const bookmarkItem = useCallback(
		(id: Layout["i"], bookmarked: Layout["meta"]["bookmarked"]) => {
			// TODO api
			setLayout((current) =>
				current.map((item) => (item.i === id ? { ...item, meta: { bookmarked, name: item.meta.name } } : item))
			);
		},
		[setLayout]
	);

	const addItem = useCallback(
		(size: { w: number; h: number }) => {
			const widgetLayout = makeLayout(size);
			setLayout((current) => [...current, widgetLayout]);

			lastAdded.current = widgetLayout.i;
		},
		[setLayout]
	);

	$hooks.useOnce(fetch);

	return [
		layout,
		{ isLoading, error, lastAdded: lastAdded.current },
		{ fetch, save, reset, deleteItem, toggleItem, renameItem, bookmarkItem, addItem },
	];
};

export default { useLayout };
