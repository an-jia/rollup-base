import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import rollupTypescript from 'rollup-plugin-typescript';
import pkg from './package.json';

let conf = {
  entry: 'src/main.ts',
  plugins: [
    rollupTypescript(),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
      exclude: [],
      extensions: [ '.js', '.ts' ],
      ignoreGlobal: false
    })
  ]
}

let _extend = function(obj,exObj) {
  for( let ex in exObj ){
    obj[ex] = exObj[ex];
  }
  return obj;
}

/**
 * default 的返回，可以使对象，也可以是数组，数组的话会依次打包
 */

export default [
  _extend({
     format: 'amd',
     dest: pkg.amd,
  },conf)
  ,
  _extend({
     format: 'cjs',
     dest: pkg.cjs
  },conf)
  ,
   _extend({
     format: 'es',
     dest: pkg.es
  },conf)
  ,
  _extend({
     external: ['ms'],//不捆绑ms，将其作为外部模块
     format: 'iife',
     dest: pkg.iife,
     moduleName: 'MyBundle'
  },conf)
  ,
  _extend({
     format: 'umd',
     dest: pkg.umd,
     moduleName: 'MyBundle'
  },conf)

  // ,
  // _extend({
  //   external: ['ms'], //不捆绑ms，将其作为外部模块
	//   targets: [
	//   		{ dest: pkg.cjs, format: 'cjs' },
	//   		{ dest: pkg.es, format: 'es' }
	//   ]
  // },conf)
];

