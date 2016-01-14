import babel from 'rollup-plugin-babel'

export default {
  entry: 'index.js',
  dest: 'dist/riot-mixin-pack.js',
  format: 'iife',
  moduleName: 'riotMixinPack',
  plugins: [
    babel()
  ]
}
