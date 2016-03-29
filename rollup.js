const
  rollup       = require('rollup'),
  babel        = require('rollup-plugin-babel'),
  resolve      = require('rollup-plugin-node-resolve'),
  commonjs     = require('rollup-plugin-commonjs'),
  changeCase   = require('change-case'),
  packageName  = require('./package.json').name

rollup
  .rollup({
    entry: 'index.js',
    plugins: [resolve({ jsnext: true }), commonjs(), babel()]
  })
  .then(bundle => {
    bundle.write({
      format: 'iife',
      moduleName: changeCase.camelCase(packageName),
      dest: `dist/${ packageName }.js`
    })
    bundle.write({ format: 'es6', dest: `dist/${ packageName }.es6.js` })
    bundle.write({ format: 'amd', dest: `dist/${ packageName }.amd.js` })
    bundle.write({ format: 'cjs', dest: `dist/${ packageName }.cjs.js` })
  })
  .catch(error => {
    console.error(error)
  })
