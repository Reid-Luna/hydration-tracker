const babel = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const builtinModules = require("builtin-modules");
module.exports = {
  input: "src/main.js",
  output: {
    file: "roll_main.js",
    format: "cjs",
    exports: "default",
    sourcemap: "inline",
    sourcemapExcludeSources: true,
  },
  external: ["obsidian"], //, ...builtinModules
  plugins: [
    resolve({
      browser: true,
    }),
    babel({
      presets: ["@babel/preset-react"],
      babelHelpers: "bundled",
    }),
    commonjs(),
  ],
};
