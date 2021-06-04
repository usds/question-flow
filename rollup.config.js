// import peerDepsExternal from "rollup-plugin-peer-deps-external";
// import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
// import typescript from "rollup-plugin-typescript2";
// import dts from "rollup-plugin-dts";
// import ts from "rollup-plugin-ts";

// const packageJson = require("./package.json");

// export default {
//   input: "src/index.ts",
//   // output: [
//   //   {
//   //     file: packageJson.main,
//   //     format: "cjs",
//   //     sourcemap: true
//   //   },
//   //   {
//   //     file: packageJson.module,
//   //     format: "esm",
//   //     sourcemap: true
//   //   },
//   //   { file: "dist/index.d.ts", format: "es" }
//   // ],
//   plugins: [
//     ts(),
//   ]
// };

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-ts';
import pkg from './package.json';

const input = 'src/index.ts';
const name = 'template';
const production = process.env.NODE_ENV === 'production';
const browserslist = pkg.browserslist[process.env.NODE_ENV];

const keys = (deps) =>
  deps == null ? [] : Object.keys(deps).map((dep) => new RegExp(`^${dep}`));

export default [
  {
    input,
    external: [...keys(pkg.dependencies), ...keys(pkg.peerDependencies)],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: production,
        exports: 'auto',
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: production,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        transpiler: 'babel',
        browserslist,
      }),
      production &&
        terser({
          output: {
            comments: false,
          },
        }),
    ],
    watch: {
      clearScreen: false,
    },
  },
  {
    input,
    external: keys(pkg.peerDependencies),
    output: {
      file: pkg.browser,
      format: 'umd',
      name,
      sourcemap: production,
    },
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        transpiler: 'babel',
        browserslist,
      }),
      production &&
        terser({
          output: {
            comments: false,
          },
        }),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
