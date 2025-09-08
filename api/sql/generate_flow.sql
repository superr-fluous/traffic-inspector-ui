INSERT INTO flows (
    id,
    src_mac,
    dst_mac,
    src_ip,
    dst_ip,
    src_port,
    dst_port,
    ipv,
    tcp_fingerprint,
    src_os,
    dst_os,
    proto,
    src_country,
    dst_country,
    src_as,
    dst_as,
    first_seen,
    last_seen,
    src_num_pkts,
    dst_num_pkts,
    src_len_pkts,
    dst_len_pkts,
    ndpi_proto,
    ndpi_category
)
SELECT
    gen_random_uuid()::text AS id,
    -- Random MAC addresses
    lpad(to_hex((random()*255)::int), 2, '0') || ':' ||
    lpad(to_hex((random()*255)::int), 2, '0') || ':' ||
    lpad(to_hex((random()*255)::int), 2, '0') || ':' ||
    lpad(to_hex((random()*255)::int), 2, '0') || ':' ||
    lpad(to_hex((random()*255)::int), 2, '0') || ':' ||
    lpad(to_hex((random()*255)::int), 2, '0') AS src_mac,
    lpad(to_hex((random()*255)::int), 2, '0') || ':' ||
    lpad(to_hex((random()*255)::int), 2, '0') || ':' ||
    lpad(to_hex((random()*255)::int), 2, '0') || ':' ||
    lpad(to_hex((random()*255)::int), 2, '0') || ':' ||
    lpad(to_hex((random()*255)::int), 2, '0') || ':' ||
    lpad(to_hex((random()*255)::int), 2, '0') AS dst_mac,
    -- Random IPv4
    (trunc(random()*255)::int || '.' ||
     trunc(random()*255)::int || '.' ||
     trunc(random()*255)::int || '.' ||
     trunc(random()*255)::int) AS src_ip,
    (trunc(random()*255)::int || '.' ||
     trunc(random()*255)::int || '.' ||
     trunc(random()*255)::int || '.' ||
     trunc(random()*255)::int) AS dst_ip,
    (1024 + random()*64511)::int AS src_port,
    (1024 + random()*64511)::int AS dst_port,
    (array[4,6])[floor(random()*2)+1]::int AS ipv,
    md5(random()::text) AS tcp_fingerprint,
    (ARRAY['Windows','Linux','macOS','Android','iOS'])[floor(random()*5)+1] AS src_os,
    (ARRAY['Windows','Linux','macOS','Android','iOS'])[floor(random()*5)+1] AS dst_os,
    (ARRAY['TCP','UDP','ICMP'])[floor(random()*3)+1] AS proto,
    (ARRAY['US','JP','DE','FR','CN','IN','BR'])[floor(random()*7)+1] AS src_country,
    (ARRAY['US','JP','DE','FR','CN','IN','BR'])[floor(random()*7)+1] AS dst_country,
    ('AS' || (1000 + trunc(random()*9000))::text) AS src_as,
    ('AS' || (1000 + trunc(random()*9000))::text) AS dst_as,
    now() - (random() * interval '30 days') AS first_seen,
    now() - (random() * interval '1 days') AS last_seen,
    (random()*10000)::bigint AS src_num_pkts,
    (random()*10000)::bigint AS dst_num_pkts,
    (random()*1000000)::bigint AS src_len_pkts,
    (random()*1000000)::bigint AS dst_len_pkts,
    (ARRAY['HTTP','HTTPS','DNS','SSH','FTP','SMTP'])[floor(random()*6)+1] as ndpi_proto,
    (ARRAY['Web','Mail','FileTransfer','Streaming','Gaming'])[floor(random()*5)+1] as ndpi_category
FROM generate_series(1, 100);
