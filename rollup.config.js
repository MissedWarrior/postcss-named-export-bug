import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default {
  input: 'src/ui/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'es',
      exports: 'named',
      sourcemap: false,
    },
  ],
  plugins: [
    external(),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/__tests__/**',
      clean: true,
      tsconfig: 'tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
      },
    }),
    postcss({
      extensions: ['.css', '.scss'],
      minimize: true,
      modules: true,
      namedExports(name) {
        return name.replace(/-(.)/g, (_, nextLetter) => {
          return nextLetter.toUpperCase();
        });
      },
      use: [
        ['sass'],
      ]
    }),
  ]
};
