import { $api } from "@services";
import type { Layout, Model, ViewList } from "../../model";

interface PreviewParams {
	dataSource: any;
	dataInfo: any;
	dataVisual: any;
	config: any;
	filters: any;
}

interface PreviewResulst {
	id: string;
	value: string | number;
}

export default {
	// layout: (view: ViewList) => $api.get<Model>(`dashboard?type=${view}`),
	self: () => $api.get<Model>('dashboard'),
	data: (id: Layout['i']) => $api.get<PreviewResulst[]>(`dashboard/data/${id}`),
	preview: (params: PreviewParams) => $api.post<PreviewResulst[]>('dashboard/preview', { body: JSON.stringify(params) })
};
