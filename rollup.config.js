import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/arkPlayer.js',
  output: {
    file: 'dist/arkPlayer.js',
    format: 'iife'
  },
  plugins: [resolve(), commonjs(), babel({ babelHelpers: 'bundled' })]
};