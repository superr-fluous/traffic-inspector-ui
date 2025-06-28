import { $api } from "@services";

import type { Flow, FlowDetailed } from "../model";

export interface TablePagination {
	current_page: number;
	limit: number;
	total_flows: number;
	total_pages: number;
	next_page: number;
}

export interface ApiResponse {
	data: Flow[];
	pagination: TablePagination;
}

export const getList = async (page: number, limit = 20, signal?: AbortSignal) =>
	await $api<ApiResponse>(`flows/all?page=${page}&limit=${limit}`, { signal });

export const getFlow = async (id: Flow["id"], signal?: AbortSignal) =>
	await $api<FlowDetailed>(`flows/${id}`, { signal });

export const getTotal = async (signal?: AbortSignal) => await $api<number>(`flows/total`, { signal });

export const getTotalOverTime = async (signal?: AbortSignal) => await $api(`dashboard/total`, { signal });

