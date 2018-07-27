import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import { name, version, dependencies, devDependencies, peerDependencies } from './package.json';

const target = process.env.TARGET || 'es';
const banner = `/*
 * @license
 * ${name} v${version}
 * (c) 2018-${new Date().getFullYear()} Malash <i@malash.me>
 * Released under the MIT License.
 */`;

const config = {
  input: 'src/index.js',
  external: Object.keys(Object.assign({}, dependencies, devDependencies, peerDependencies)),
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      // .babelrc
      presets: [
        ['es2015', { modules: false }],
        'stage-0',
      ],
      plugins: ['external-helpers'],
    }),
    commonjs(),
    filesize(),
  ],
  output: {
    banner,
    file: `dist/${name}.${target}.js`,
    name: 'MpSvgLoader',
    format: target,
  },
};

export default config;
