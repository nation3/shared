import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  minify: true,
  platform: "browser",
  replaceNodeEnv: true,
  // now required because not defaulted anymore
  shims: true,
  // use rollup for build to get smaller bundle sizes with tree shaking
  treeshake: true,
  globalName: "Nation3Utility",
  format: ["cjs", "esm"],
  esbuildPlugins: [],
  // inject globals onto window if required
  banner: {
    js: '!function(o){o&&(void 0===o.global&&(o.global=o),void 0===o.globalThis&&(o.globalThis=o),void 0===o.process&&(o.process={env:{NODE_ENV:"production"}}))}("undefined"!=typeof window?window:void 0);',
  },
});
