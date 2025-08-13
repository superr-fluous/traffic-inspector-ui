import { useRef } from "react";

type AnyFunction = ((...args: unknown[]) => unknown) | (() => unknown);

export default function useOnce<Callback extends AnyFunction>(cb: Callback) {
	const called = useRef<boolean>(false);

	if (!called.current) {
		cb();
		called.current = true;
	}
}
