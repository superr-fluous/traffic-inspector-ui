import "ky";
import type {
	Input,
	Options,
	KyRequest,
	NormalizedOptions,
	KyResponse,
	BeforeErrorHook,
	BeforeRetryHook,
} from "ky";

import type { $ApiSuccess, $ApiFail } from "@services/api";

// Redefine method signatures to return ResponsePromise<T | $ApiFail>
export type KyRedeclaredAfterResponseHook = (
	request: KyRequest,
	options: NormalizedOptions,
	response: KyResponse,
) => $ApiSuccess | $ApiFail | void | Promise<$ApiSuccess | $ApiFail | void>;

export interface KyRedeclaredHooks {
	afterResponse: KyRedeclaredAfterResponseHook;
	beforeRequest: BeforeRequestHook;
	beforeRetry: BeforeRetryHook;
	beforeError: BeforeErrorHook;
}

export interface KyRedeclaredOptions extends Options {
	hooks: KyRedeclaredHooks;
}

export interface KyRedeclaredResponse<T = Record<string | symbol | number, unknown>> extends Response {
	json: () => Promise<T>;
};

interface KyRedeclaredInstance {
	<T = Record<string | symbol | number, unknown>>(
		url: Input,
		options?: Options,
	): Promise<KyRedeclaredResponse<$ApiSuccess<T> | $ApiFail>>;
	get: <T = $ApiSuccess>(
		url: Input,
		options?: Options,
	) => Promise<KyRedeclaredResponse<$ApiSuccess<T> | $ApiFail>>;
	post: <T = $ApiSuccess>(
		url: Input,
		options?: Options,
	) => Promise<KyRedeclaredResponse<$ApiSuccess<T> | $ApiFail>>;
	put: <T = $ApiSuccess>(
		url: Input,
		options?: Options,
	) => Promise<KyRedeclaredResponse<$ApiSuccess<T> | $ApiFail>>;
	patch: <T = $ApiSuccess>(
		url: Input,
		options?: Options,
	) => Promise<KyRedeclaredResponse<$ApiSuccess<T> | $ApiFail>>;
	delete: <T = $ApiSuccess>(
		url: Input,
		options?: Options,
	) => Promise<KyRedeclaredResponse<$ApiSuccess<T> | $ApiFail>>;
	head: <T = $ApiSuccess>(
		url: Input,
		options?: Options,
	) => Promise<KyRedeclaredResponse<$ApiSuccess<T> | $ApiFail>>;
	create: (defaultOptions?: Options) => KyRedeclaredInstance;
}
