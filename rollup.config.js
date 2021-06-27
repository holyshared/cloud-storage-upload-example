import typescript from '@rollup/plugin-typescript';
//import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/client.ts',
  plugins: [
    commonjs(),
//    babel({
  //    babelHelpers: 'bundled',
    //  exclude: ["node_modules"]
//    }),
    typescript({
      module: "esnext",
      resolveJsonModule: false,
      outDir: "./public/assets/js",
    }),
  ],
  output: {
    dir: "./public/assets/js",
    format: 'iife'
  }
}