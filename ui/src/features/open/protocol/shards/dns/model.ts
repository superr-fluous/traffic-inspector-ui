interface Model {
	rsp_addr: string[];
	rsp_type: number;
	query_type: number;
	reply_code: number;
	num_answers: number;
	num_queries: number;
}

export default Model;
