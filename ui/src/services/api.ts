import ky from "ky";
import type { KyResponse, Input, Options } from "ky";

import type { AnyObject } from "@shared/helpers/types";

export interface $ApiSuccess<T = AnyObject> {
	ok: true;
	data: T;
}

export interface $ApiFail {
	ok: false;
	error: string;
	code: number;
}

type $ApiOptions = Pick<Options, "signal" | "body">;

async function parseNetResponse<T = AnyObject>(res: KyResponse<unknown>) {
  let response: $ApiSuccess<T> | $ApiFail;

  const text = await res.text();
  const hasBody = text.trim().length > 0;
  let resData: T | AnyObject = {} as T;

  if (hasBody) {
    try {
      resData = JSON.parse(text) as T;
    } catch {
      // optionally log or ignore parse errors
      resData = {} as T;
    }
  }

  if (res.ok) {
    response = { ok: true, data: resData };
  } else {
    let error = "Request prompted an error";
    if (hasBody && typeof resData === "object" && resData !== null && "detail" in resData) {
      error = (resData as AnyObject).detail as string;
    }
    response = { ok: false, error, code: res.status };
  }

  return response;
}


const kyInstance = ky.create({
	prefixUrl: "/api/v1",
	timeout: 30000,
	retry: { limit: 1 },
	headers: { "Content-Type": "application/json" },
	throwHttpErrors: false,
});

const api = async <T = AnyObject>(url: Partial<Input>, options?: $ApiOptions) =>
	parseNetResponse<T>(await kyInstance(url as Input, options));

api.get = async <T = AnyObject>(url: Partial<Input>, options?: $ApiOptions) =>
	parseNetResponse<T>(await kyInstance.get(url as Input, options));
api.put = async <T = AnyObject>(url: Partial<Input>, options?: $ApiOptions) =>
	parseNetResponse<T>(await kyInstance.put(url as Input, options));
api.post = async <T = AnyObject>(url: Partial<Input>, options?: $ApiOptions) =>
	parseNetResponse<T>(await kyInstance.post(url as Input, options));
api.patch = async <T = AnyObject>(url: Partial<Input>, options?: $ApiOptions) =>
	parseNetResponse<T>(await kyInstance.patch(url as Input, options));
api.delete = async <T = AnyObject>(url: Partial<Input>, options?: $ApiOptions) =>
	parseNetResponse<T>(await kyInstance.delete(url as Input, options));

export default api;
