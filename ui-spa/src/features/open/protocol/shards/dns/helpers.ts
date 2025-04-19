export const types: Record<number, string> = {
	1: "A", // IPv4 address
	2: "NS", // Name server
	3: "MD", // Mail destination (obsolete)
	4: "MF", // Mail forwarder (obsolete)
	5: "CNAME", // Canonical name
	6: "SOA", // Start of authority
	7: "MB", // Mailbox (experimental)
	8: "MG", // Mail group member (experimental)
	9: "MR", // Mail rename (experimental)
	10: "NULL", // Null record (experimental)
	11: "WKS", // Well-known service
	12: "PTR", // Pointer
	13: "HINFO", // Host information
	14: "MINFO", // Mailbox information
	15: "MX", // Mail exchange
	16: "TXT", // Text string
	17: "RP", // Responsible person
	18: "AFSDB", // AFS database
	19: "X25", // X.25 address
	20: "ISDN", // ISDN address
	21: "RT", // Route through
	22: "NSAP", // NSAP address
	23: "NSAP-PTR", // NSAP pointer
	24: "SIG", // Signature
	25: "KEY", // Key
	26: "PX", // X.400 mail mapping
	27: "GPOS", // Geographical position
	28: "AAAA", // IPv6 address
	29: "LOC", // Location
	30: "NXT", // Next valid (obsolete)
	31: "EID", // Endpoint identifier
	32: "NIMLOC", // Nimrod locator
	33: "SRV", // Server selection
	34: "ATMA", // ATM address
	35: "NAPTR", // Naming authority pointer
	36: "KX", // Key exchanger
	37: "CERT", // Certificate
	38: "A6", // A6 (experimental)
	39: "DNAME", // Delegation name
	40: "SINK", // SINK (experimental)
	41: "OPT", // Option
	42: "APL", // Address prefix list
	43: "DS", // Delegation signer
	44: "SSHFP", // SSH fingerprint
	45: "IPSECKEY", // IPSEC key
	46: "RRSIG", // Resource record signature
	47: "NSEC", // Next secure
	48: "DNSKEY", // DNS key
	49: "DHCID", // DHCP identifier
	50: "NSEC3", // NSEC3
	51: "NSEC3PARAM", // NSEC3 parameters
	52: "TLSA", // TLSA certificate association
	53: "SMIMEA", // SMIMEA
	55: "HIP", // Host identity protocol
	56: "NINFO", // NINFO
	57: "RKEY", // RKEY
	58: "TALINK", // Trust anchor link
	59: "CDS", // Child DS
	60: "CDNSKEY", // Child DNSKEY
	61: "OPENPGPKEY", // OpenPGP key
	62: "CSYNC", // Child synchronization
	99: "SPF", // Sender policy framework
	100: "UINFO", // User information
	101: "UID", // User ID
	102: "GID", // Group ID
	103: "UNSPEC", // Unspecified
	104: "NID", // Node identifier
	105: "L32", // L32
	106: "L64", // L64
	107: "LP", // LP
	108: "EUI48", // EUI-48 address
	109: "EUI64", // EUI-64 address
	249: "TKEY", // Transaction key
	250: "TSIG", // Transaction signature
	251: "IXFR", // Incremental zone transfer
	252: "AXFR", // Authoritative zone transfer
	253: "MAILB", // Mailbox-related records
	254: "MAILA", // Mail agent records (obsolete)
	255: "ANY", // Any type
	256: "URI", // Uniform resource identifier
	257: "CAA", // Certification authority authorization
	258: "AVC", // Application visibility and control
	259: "DOA", // Digital object architecture
	260: "AMTRELAY", // Automatic multicast tunneling relay
	32768: "TA", // DNSSEC trust authorities
	32769: "DLV", // DNSSEC lookaside validation
};

export const replyCodes: Record<number, string> = {
	0: "NOERROR",
	1: "FORMERR",
	2: "SERVFAIL",
	3: "NXDOMAIN",
	4: "NOTIMP",
	5: "REFUSED",
};
