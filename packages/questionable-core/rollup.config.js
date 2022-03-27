import commonjs   from '@rollup/plugin-commonjs';
import resolve    from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-ts';
import pkg        from './package.json';

const input      = 'src/index.ts';
const tsconfig   = 'tsconfig.json';
const production = process.env.NODE_ENV === 'production';

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
      // {
      //   file:      pkg.module,
      //   format:    'esm',
      //   sourcemap: production,
      // },
      // {
      //   file:      pkg.browser,
      //   format:    'umd',
      //   name:      pkg.module,
      //   sourcemap: production,
      // },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
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

export default rollup;
