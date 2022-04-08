import commonjs   from '@rollup/plugin-commonjs';
import resolve    from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-ts';
import rootPkg    from './package.json';

export const getRollupConfig = (pkg = rootPkg) => {
  const input      = 'src/index.ts';
  const tsconfig   = 'tsconfig.json';
  const production = process.env.NODE_ENV === 'production';

  const keys = (deps) =>
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
};
export default getRollupConfig();
