import ky from "ky";
import type { AfterResponseHook } from "ky";

import type { KyRedeclaredInstance } from "declarations/ky";

export interface $ApiSuccess<T = Record<string | number | symbol, unknown>> {
	ok: true;
	data: T;
};

export interface $ApiFail {
	ok: false;
	error: string;
	code: number;
}

const afterResponse = (async (_, __, res) => {
	let response: $ApiSuccess | $ApiFail;

	switch (res.status) {
		case 200: {
			const resData: Record<string | number | symbol, unknown> =
				await res.json();
			response = { ok: true, data: resData };
			break;
		}
		case 500:
		case 501:
		case 503: {
			let error = "Request prompted an error";
			const resData: Record<string | number | symbol, unknown> =
				await res.json();
			if ("detail" in resData) {
				error = resData.detail as string;
			}
			response = { ok: false, error, code: res.status };
			break;
		}
		default:
			response = {
				ok: false,
				error: "Request prompted an error",
				code: res.status,
			};
			break;
	}
	// TODO: consider possible errors (network and backend); whether to use error from response

	return new Response(JSON.stringify(response));
}) satisfies AfterResponseHook;

const api = ky.create({
	prefixUrl: "/api/v1",
	timeout: 30000,
	retry: { limit: 1 },
	headers: { "Content-Type": "application/json" },
	throwHttpErrors: false,
	hooks: {
		afterResponse: [afterResponse],
	},
}) as KyRedeclaredInstance;

export default api;
