import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
export default {
  input: "src/main.js",
  output: {
    file: "main.js",
    format: "cjs",
    exports: "default",
  },
  external: ["obsidian", "fs", "os", "path"],
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
