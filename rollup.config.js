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

import commonjs   from '@rollup/plugin-commonjs';
import resolve    from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-ts';
import pkg        from './package.json';

const input        = 'src/index.ts';
const name         = 'template';
const production   = process.env.NODE_ENV === 'production';
const browserslist = pkg.browserslist[process.env.NODE_ENV];

const keys = (deps) =>
  (deps == null ? [] : Object.keys(deps).map((dep) => new RegExp(`^${dep}`)));

const rollup = [
  {
    external: [...keys(pkg.dependencies), ...keys(pkg.peerDependencies)],
    input,
    output:   [
      {
        exports:   'auto',
        file:      pkg.main,
        format:    'cjs',
        sourcemap: production,
      },
      {
        file:      pkg.module,
        format:    'esm',
        sourcemap: production,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        browserslist,
        transpiler: 'babel',
      }),
      production
        && terser({
          output: {
            comments: false,
          },
        }),
    ],
    watch: {
      clearScreen: false,
    },
  },
  // {
  //   external: keys(pkg.peerDependencies),
  //   input,
  //   output:   {
  //     file:      pkg.browser,
  //     format:    'umd',
  //     name,
  //     sourcemap: production,
  //   },
  //   plugins: [
  //     resolve({
  //       // browser: true,
  //     }),
  //     commonjs({
  //       // https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module
  //       // @see: https://github.com/rollup/plugins/tree/master/packages/commonjs#dynamicrequiretargets
  //       dynamicRequireTargets: [
  //         'node_modules/ajv/dist/*.js',
  //         'node_modules/ajv/dist/*.json',
  //         'node_modules/ajv/lib/refs/*.js',
  //         'node_modules/ajv/lib/refs/*.json',
  //         'node_modules/ajv/lib/refs/json-schema-draft-07.json',
  //       ],
  //     }),
  //     typescript({
  //       browserslist,
  //       transpiler: 'babel',
  //     }),
  //     production
  //       && terser({
  //         output: {
  //           comments: false,
  //         },
  //       }),
  //   ],
  //   watch: {
  //     clearScreen: false,
  //   },
  // },
];

export default rollup;
