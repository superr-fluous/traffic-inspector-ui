CREATE TABLE FLOW_INFO (
        id SERIAL PRIMARY KEY,
        src_ip TEXT,
        dst_ip TEXT,
        src_port INT,
        dst_port INT,
        ipv INT,
        tcp_fingerprint TEXT,
        proto TEXT,
        src_country TEXT,
        dst_country TEXT,
        src_as TEXT,
        dst_as TEXT,
        first_seen timestamp,
        last_seen timestamp,
        num_pkts bigint,
        len_pkts bigint,
        ndpi JSONB
);