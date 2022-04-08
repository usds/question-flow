/* eslint-disable @typescript-eslint/no-explicit-any */
import commonjs   from '@rollup/plugin-commonjs';
import resolve    from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-ts';

export const getRollupConfig = (pkg: any) => {
  const input        = 'src/index.ts';
  const tsconfig     = 'tsconfig.json';
  const production   = process.env.NODE_ENV === 'production';
  const browserslist = (pkg.browserslist) ? pkg.browserslist[process.env.NODE_ENV] : {};

  const keys = (deps: any) =>
    (deps == null ? [] : Object.keys(deps).map((dep) => new RegExp(`^${dep}`)));

  return [
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
          tsconfig,
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
  ];
};
