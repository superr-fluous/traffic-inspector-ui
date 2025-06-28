import { useCallback, useEffect, useState } from "react";

/**
 * useScrollSpy - tracks which element in the list of IDs is currently in view.
 *
 * @param {string[]} ids - Array of element IDs to observe (e.g. ['intro', 'features', 'faq'])
 * @param {Object} options - IntersectionObserver options
 * @returns {[string, function]} - The ID of the element currently in view
 */
export default function useScrollSpy(
	ids: string[] = [],
	options: { rootMargin: string; threshold: number } = {
		rootMargin: "0px 0px",
		threshold: 0.1,
	},
	scrollBehavior: ScrollIntoViewOptions = {
		behavior: "smooth",
		block: "center",
	},
): [string, (id: string) => void] {
	const [activeId, setActiveId] = useState("");

	useEffect(() => {
		if (typeof window === "undefined" || !("IntersectionObserver" in window))
			return;

		const observer = new IntersectionObserver((entries) => {
			const visible = entries
				.filter((entry) => entry.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

			if (visible.length > 0) {
				setActiveId(visible[0].target.id);
			}
		}, options);

		const elements = ids
			.map((id) => document.getElementById(id))
			.filter((el) => el !== null);
		elements.forEach((el) => observer.observe(el));

		return () => elements.forEach((el) => observer.unobserve(el));
	}, [ids, options.rootMargin, options.threshold]);

	// Scroll to a section with optional smooth scroll
	const scrollToId = useCallback(
		(id: string) => {
			const el = document.getElementById(id);
			if (el !== null) {
				el.scrollIntoView(scrollBehavior);
			}
		},
		[scrollBehavior],
	);

	return [activeId, scrollToId];
}
