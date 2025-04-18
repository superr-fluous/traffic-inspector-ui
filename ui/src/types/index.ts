export interface FlowData {
        id: string;
        last_seen: string;
        src_ip: string;
        dst_ip: string;
        src_port: number;
        dst_port: number;
        src_country: string;
        dst_country: string;
        protocol: string;
        category: string;
      }
      
export interface Pagination {
        current_page: number;
        limit: number;
        total_flows: number;
        total_pages: number;
        next_page: number;
}
      
export interface ApiResponse {
        data: FlowData[];
        pagination: Pagination;
}

export interface TlsInfo {
        ja4: string;
        ja3s: string;
        blocks: number;
        cipher: string;
        version: string;
        issuerDN: string;
        subjectDN: string;
        fingerprint: string;
        server_names: string;
        unsafe_cipher: number;
        negotiated_alpn: string;
        advertised_alpns: string;
        tls_supported_versions: string;
}

export interface DnsInfo {
        rsp_addr: string[];
        rsp_type: number;
        query_type: number;
        reply_code: number;
        num_answers: number;
        num_queries: number;
}

export interface FlowInfo {
        id: string;
        src_mac: string;
        dst_mac: string;
        src_ip: string;
        dest_ip: string;
        src_port: number;
        dst_port: number;
        ipv: number;
        tcp_fingerprint: string;
        src_os: string;
        dst_os: string;
        proto: string;
        src_country: string;
        dst_country: string;
        src_as: string;
        dst_as: string;
        first_seen: string;
        last_seen: string;
        src_num_pkts: number;
        dst_num_pkts: number;
        src_len_pkts: number;
        dst_len_pkts: number;
        ndpi: {
                tls: TlsInfo;
                dns: DnsInfo;
                breed: string;
                proto: string;
                category: string;
                hostname: string;
                proto_id: string;
                domainame: string;
                encrypted: number;
                confidence: { [key: string]: string };
                category_id: number;
                proto_by_ip: string;
                proto_by_ip_id: number;
        };
}