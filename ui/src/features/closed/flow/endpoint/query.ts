import type { Flow, FlowDetailed } from "../model";

export interface TablePagination {
	current_page: number;
	limit: number;
	total_flows: number;
	total_pages: number;
	next_page: number;
}

export interface ApiResponse {
	success: true;
	data: Flow[];
	pagination: TablePagination;
}

export interface ApiFail {
	success: false;
	reason: string;
}

export const getList = async (
	page: number,
	limit = 20,
): Promise<ApiResponse | ApiFail> => {
	try {
		const res = await fetch(
			`http://localhost:8000/api/v1/flows/all?page=${page}&limit=${limit}`,
		);
		return { success: true, ...(await res.json()) } satisfies ApiResponse;
	} catch (_) {
		return {
			success: false,
			reason: "Failed to fetch flows list",
		} satisfies ApiFail;
	}
};

export const getFlow = async (id: Flow["id"]) => {
	try {
		const res = await fetch(`http://localhost:8000/api/v1/flows/${id}`);
		return { success: true, data: (await res.json()) satisfies FlowDetailed };
	} catch (_) {
		return {
			success: false,
			reason: "Failed to fetch flow data",
		} satisfies ApiFail;
	}
};
