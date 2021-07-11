import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/client.ts',
  plugins: [
    commonjs(),
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