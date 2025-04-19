import * as esbuild from "esbuild";

import { copy } from "./build-plugins.js";

await esbuild.build({
  format: "esm",
  platform: "browser",
  bundle: true,
  minify: true,
  outfile: "build/index.js",
  entryPoints: ["src/index.js"],
  tsconfig: "tsconfig.json",
  jsx: "automatic",
  jsxDev: false,
  target: ["chrome120", "firefox130"],
  treeShaking: true,
  plugins: [copy({ from: "static/index.prod.html", to: "build/index.html" })],
});
