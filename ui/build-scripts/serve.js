import * as esbuild from "esbuild";
import CssModulesPlugin from "esbuild-css-modules-plugin";

import http from "node:http";
import path from "path";
import fs from "fs";

import { copy } from "./build-plugins.js";

// Start esbuild's server on a random local port
let ctx = await esbuild.context({
	format: "esm",
	platform: "browser",
	bundle: true,
	minify: false,
	outfile: "dev/index.js",
	entryPoints: ["src/index.js"],
	tsconfig: "tsconfig.json",
	jsx: "automatic",
	jsxDev: true,
	target: ["chrome120", "firefox130"],
	treeShaking: true,
	sourcemap: true,
	plugins: [
		copy([
			{ from: "build-templates/index.dev.html", to: "dev/index.html" },
			{ from: "assets", to: "dev/assets" },
		]),
		CssModulesPlugin({
			inject: false,
			localsConvention: "camelCase",
			pattern: "[local]___[hash]",
		}),
	],
});

// The return value tells us where esbuild's local server is
let { hosts, port } = await ctx.serve({
	servedir: "dev",
	host: "localhost",
});

const SERVE_DIR = path.join(path.dirname("."), "dev");
const INDEX = path.join(SERVE_DIR, "index.html");

const getContentType = (ext) => {
	const types = {
		".js": "application/javascript",
		".css": "text/css",
		".html": "text/html",
		".png": "image/png",
		".jpg": "image/jpeg",
		".svg": "image/svg+xml",
		".json": "application/json",
	};
	return types[ext] || "application/octet-stream";
};

// Then start a proxy server on port 3000
http
	.createServer((req, res) => {
		const options = {
			hostname: hosts[0],
			port: port,
			path: req.url,
			method: req.method,
			headers: req.headers,
		};

		const proxyReq = http.request(options, (proxyRes) => {
			const url = req.url;
			let reqFile = path.join(SERVE_DIR, url);

			if (url === "/esbuild") {
				res.writeHead(proxyRes.statusCode, proxyRes.headers);
				proxyRes.pipe(res, { end: true });
				return;
			}
			if (url.startsWith("/api")) {
				console.log("Requested /api");
				res.writeHead(501, { "Content-Type": "application/json" });
				res.end(
					JSON.stringify({
						detail: "/api is not available in local development mode",
					}),
				);
				return;
			}

			console.log("requested:", reqFile);
			if (!(fs.existsSync(reqFile) && fs.statSync(reqFile).isFile())) {
				// 🔁 Fallback to index.html for unknown routes (SPA style)
				reqFile = INDEX;
			}

			const ext = path.extname(reqFile).toLowerCase();
			const contentType = getContentType(ext);

			fs.readFile(reqFile, (err, data) => {
				if (err) {
					res.writeHead(500, { "Content-Type": "text/plain", Content: err });
					res.end(`500 - Could not load ${reqFile}`);
				} else {
					res.writeHead(200, { "Content-Type": contentType });
					res.end(data);
				}
			});
		});

		req.pipe(proxyReq, { end: true });
	})
	.listen(3000, () => {
		console.log("🌐 Proxy server running at http://localhost:3000");
	});
