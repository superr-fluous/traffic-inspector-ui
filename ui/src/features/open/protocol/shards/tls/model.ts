interface Model {
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

export default Model;
