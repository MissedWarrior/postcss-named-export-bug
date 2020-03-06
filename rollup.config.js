import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import cleanup from 'rollup-plugin-cleanup';

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
    resolve({
      jsnext: true,
      browser: true,
    }),
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
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        'node_modules/react/react.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement',
        ],
        'node_modules/react-dom/index.js': ['render'],
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
    cleanup({
      comments: 'none',
      sourcemap: true,
    }),
  ]
};
